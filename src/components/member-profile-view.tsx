"use client";

import { Navbar } from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Download, UserCheck, ShieldCheck, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

interface MemberProfileViewProps {
    member: any;
}

export function MemberProfileView({ member }: MemberProfileViewProps) {
    return (
        <div className="dark bg-zinc-950 min-h-screen text-zinc-50 flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden">
            <Navbar />
            
            <main className="flex-1 relative flex items-center justify-center pt-16 md:pt-20 pb-8 px-4 md:px-6">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-blue-600/5 blur-[140px] rounded-full pointer-events-none -z-10" />

                <div className="w-full max-w-5xl mx-auto space-y-4">
                    <div className="px-4">
                        <Link href={`/teams/${member.team.slug}`} className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors group">
                            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO DIVISION
                        </Link>
                    </div>

                    <div className="relative bg-zinc-900/30 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-0">
                            
                            {/* Photo Column */}
                            <div className="p-6 md:p-8 lg:p-10 flex items-center">
                                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group">
                                    {member.photo ? (
                                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-9xl font-black text-zinc-800">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent opacity-60" />
                                </div>
                            </div>

                            {/* Info Column */}
                            <div className="p-6 md:p-10 lg:p-10 lg:pl-0 flex flex-col justify-center">
                                <div className="mb-6">
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-6 shadow-sm">
                                        VERIFIED MEMBER PROFILE
                                    </div>
                                    
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white tracking-tight mb-6 leading-[1.1]">
                                        {member.name}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> {member.position.name}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">{member.team.name}</span>
                                        </div>
                                    </div>
                                </div>

                                {member.bio && (
                                    <div className="mb-8 space-y-3">
                                        <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em]">BIOGRAPHY</h3>
                                        <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium italic max-w-2xl opacity-90">
                                            "{member.bio}"
                                        </p>
                                    </div>
                                )}

                                {/* Social Icons */}
                                <div className="flex items-center gap-3 mb-8">
                                    {[
                                        { id: 'email', icon: Mail, url: member.email ? `mailto:${member.email}` : null },
                                        { id: 'instagram', icon: FaInstagram, url: member.instagram },
                                        { id: 'facebook', icon: FaFacebookF, url: member.facebook },
                                        { id: 'linkedin', icon: FaLinkedinIn, url: member.linkedin },
                                        { id: 'website', icon: FaGlobe, url: member.website },
                                    ].filter(s => s.url).map(social => (
                                        <a key={social.id} href={social.url!} target={social.id !== 'email' ? "_blank" : undefined} rel={social.id !== 'email' ? "noreferrer" : undefined} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
                                            <social.icon className="text-base" />
                                        </a>
                                    ))}
                                </div>

                                {/* Bottom Status Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <UserCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">DIVISION STATUS</p>
                                            <p className="text-xs font-bold text-white tracking-tight uppercase tracking-[0.1em]">Active Member</p>
                                        </div>
                                    </div>

                                    {member.qrCodeUrl && (
                                        <Dialog>
                                            <DialogTrigger render={
                                                <button className="p-5 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:bg-blue-600/10 transition-all text-blue-400 text-left" />
                                            }>
                                                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                    <Download className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">PROFILE SCAN</p>
                                                    <p className="text-xs font-bold text-inherit tracking-tight uppercase tracking-[0.1em]">Download QR Code</p>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[320px] bg-zinc-950 border-white/10 rounded-[2.5rem] p-8 text-center text-white">
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-bold tracking-tight uppercase mb-1">Member Identity</h3>
                                                    <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Official Baroedak COMO Profile</p>
                                                </div>
                                                <div className="p-4 bg-white rounded-2xl inline-block mb-6 shadow-2xl border-4 border-blue-500/10">
                                                    <img src={member.qrCodeUrl} alt="QR Code" className="w-[120px] h-[120px]" />
                                                </div>
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
                                                    className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 font-bold h-12 text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20"
                                                >
                                                    Save Identity
                                                </Button>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-6 border-t border-white/5 bg-zinc-950 text-center">
                <p className="text-zinc-800 text-[9px] uppercase tracking-[0.5em] font-black">Baroedak COMO Official</p>
            </footer>
        </div>
    );
}



