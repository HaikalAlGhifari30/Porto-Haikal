"use client";

import Link from "next/link";
import { useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Settings, ChevronLeft, ChevronRight, Image as ImageIcon, User, Network, MessageCircle, Briefcase, GraduationCap, Users } from "lucide-react";
import { CMSGuard } from "@/components/cms-guard";
import { ThemeSwitcher } from "@/components/cms/theme-switcher";
import { AdminProfile } from "@/components/cms/admin-profile";
import { HagLogo } from "@/components/hag-logo";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CMSLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollContainerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;
        
        const currentScrollY = scrollContainerRef.current.scrollTop;
        
        if (Math.abs(currentScrollY - lastScrollY) < 10) return;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    const SidebarLinks = () => {
        const menuGroups = [
            {
                title: "Utama",
                items: [
                    { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
                ]
            },
            {
                title: "Seksi Landing Page",
                items: [
                    { href: "/cms/company-profile", label: "Hero & Bio (About)", icon: User },
                    { href: "/cms/projects", label: "Portofolio Proyek", icon: FolderKanban },
                    { href: "/cms/experience", label: "Pengalaman Karir", icon: Briefcase },
                    { href: "/cms/education", label: "Riwayat Pendidikan", icon: GraduationCap },
                    { href: "/cms/organization", label: "Pengalaman Organisasi", icon: Users },
                    { href: "/cms/gallery", label: "Galeri Screenshot", icon: ImageIcon },
                ]
            },
            {
                title: "Sistem",
                items: [
                    { href: "/cms/settings", label: "Pengaturan Website", icon: Settings },
                ]
            }
        ];

        return (
            <nav className="flex-1 py-4 px-4 space-y-6 overflow-y-auto overflow-x-hidden">
                {menuGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="space-y-2">
                        {!isCollapsed && (
                            <div className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
                                {group.title}
                            </div>
                        )}
                        {group.items.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href));
                            return (
                                <Link 
                                    key={item.href}
                                    href={item.href} 
                                    onClick={() => setIsSidebarOpen(false)} 
                                    className={cn(
                                        "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group relative",
                                        isActive 
                                            ? "bg-[#142346]/75 backdrop-blur-md text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] font-bold" 
                                            : "text-slate-500 dark:text-slate-400 hover:text-cyan-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium",
                                        isCollapsed && "px-2.5 justify-center"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 shrink-0",
                                        isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400"
                                    )} />
                                    {!isCollapsed && <span className="truncate text-[13px]">{item.label}</span>}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-white/10 shadow-2xl">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>
        );
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-slate-900 dark:text-slate-50 overflow-hidden font-sans transition-colors duration-300 relative">
            {/* Desktop Sidebar (Left) */}
            <aside 
                className={cn(
                    "m-4 rounded-[2rem] bg-white/90 dark:bg-[#070e20]/90 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/20 flex flex-col shadow-2xl relative z-20 hidden lg:flex transition-all duration-500 ease-in-out",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Collapse Toggle Button */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-32 w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 shadow-xl z-50 transition-all hover:scale-110 active:scale-95 cursor-pointer"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="h-[90px] relative border-b border-slate-100 dark:border-zinc-800/60 transition-all duration-500 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-3 px-4 group">
                        <HagLogo size="md" useImage={false} />
                        {!isCollapsed && (
                            <div className="flex flex-col justify-center gap-[1px] leading-none transition-all duration-500">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Haikal Al Ghifari</span>
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-cyan-400">QA PORTFOLIO</span>
                            </div>
                        )}
                    </Link>
                </div>
                <SidebarLinks />

                {/* Sidebar Footer Branding */}
                <div className="p-6 mt-auto border-t border-slate-100 dark:border-zinc-800/60">
                    {!isCollapsed ? (
                        <div className="flex flex-col gap-1 transition-all duration-500">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 uppercase tracking-[0.2em] leading-tight">Haikal Al Ghifari</p>
                            <div className="flex items-center justify-between">
                                <p className="text-[9px] font-semibold text-cyan-400 uppercase tracking-widest">QA Portfolio CMS</p>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">System Live</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-black text-cyan-400 uppercase vertical-rl tracking-widest">HAG CMS</span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Top Header */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-slate-100/50 dark:border-zinc-800/30 z-[100] px-4 flex items-center justify-between transition-all duration-300">
                    <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform">
                        <HagLogo size="sm" useImage={false} />
                        <div className="flex flex-col leading-[1.1]">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Haikal Al Ghifari</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-cyan-400">QA PORTFOLIO</span>
                        </div>
                    </Link>
                    
                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100/50 dark:bg-zinc-900/50 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/50">
                        <div className="scale-[0.85] origin-center -mx-1">
                            <ThemeSwitcher />
                        </div>
                        <div className="h-3 w-px bg-slate-200 dark:bg-zinc-800/60 mx-0.5" />
                        <div className="scale-[0.85] origin-center -ml-1">
                            <AdminProfile />
                        </div>
                    </div>
                </header>

                <main 
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto pt-20 pb-28 px-4 md:px-8 lg:p-10 lg:pt-24 lg:pb-10 relative scroll-smooth"
                >
                    {/* Desktop Top Actions */}
                    <div className="hidden lg:flex absolute top-6 right-10 z-[50] items-center gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-[#070e20]/90 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 shadow-2xl">
                            <ThemeSwitcher />
                            <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800/60 mx-1" />
                            <AdminProfile />
                        </div>
                    </div>

                    <CMSGuard>
                        <div className="max-w-[1400px] mx-auto">
                            {children}
                        </div>
                    </CMSGuard>
                </main>

                {/* Mobile Bottom Navigation */}
                <motion.nav 
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ 
                        y: isNavVisible ? 0 : 100,
                        opacity: isNavVisible ? 1 : 0
                    }}
                    transition={{ 
                        duration: 0.35, 
                        ease: [0.23, 1, 0.32, 1] 
                    }}
                    className="lg:hidden fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-md h-14 bg-zinc-950/80 dark:bg-[#070e20]/90 backdrop-blur-3xl border border-white/10 dark:border-cyan-500/30 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.3)] z-[100] flex items-center justify-around px-2"
                >
                    {[
                        { href: "/cms", label: "Home", icon: LayoutDashboard },
                        { href: "/cms/experience", label: "Karir", icon: Briefcase },
                        { href: "/cms/education", label: "Edu", icon: GraduationCap },
                        { href: "/cms/organization", label: "Org", icon: Users },
                        { href: "/cms/projects", label: "Proyek", icon: FolderKanban },
                        { href: "/cms/settings", label: "Setting", icon: Settings },
                    ].map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href));
                        return (
                            <Link 
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-0.5 min-w-[4rem] h-11 rounded-2xl transition-all duration-300 relative shrink-0",
                                    isActive 
                                        ? "text-cyan-400 font-bold" 
                                        : "text-slate-400 dark:text-zinc-500"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-4.5 h-4.5 transition-all duration-300",
                                    isActive ? "scale-110 text-cyan-400" : "scale-100"
                                )} />
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-wider",
                                    isActive ? "opacity-100 text-cyan-400" : "opacity-60"
                                )}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="mobile-nav-indicator"
                                        className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" 
                                    />
                                )}
                            </Link>
                        );
                    })}
                </motion.nav>
            </div>
        </div>
    );
}

