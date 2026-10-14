"use client";

import Link from "next/link";
import { useState, ReactNode, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Settings, ChevronLeft, ChevronRight, Image as ImageIcon, User, Network, MessageCircle, Briefcase, GraduationCap, Users, Award } from "lucide-react";
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
                    { href: "/cms/messages", label: "Pesan Masuk", icon: MessageCircle },
                ]
            },
            {
                title: "Seksi Landing Page",
                items: [
                    { href: "/cms/company-profile", label: "Hero & Bio (About)", icon: User },
                    { href: "/cms/projects", label: "Portofolio Proyek", icon: FolderKanban },
                    { href: "/cms/experience", label: "Pengalaman Karir", icon: Briefcase },
                    { href: "/cms/education", label: "Riwayat Pendidikan", icon: GraduationCap },
                    { href: "/cms/certificates", label: "Sertifikasi & Lisensi", icon: Award },
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
                                        "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-150 group relative cursor-pointer btn-retro",
                                        isActive 
                                            ? "bg-[#FACC15] text-black border-2 border-black dark:border-white shadow-retro-xs font-bold" 
                                            : "text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-yellow-100/80 dark:hover:bg-zinc-800 font-medium",
                                        isCollapsed && "px-2.5 justify-center"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105 shrink-0",
                                        isActive ? "text-black" : "text-zinc-500 group-hover:text-black dark:group-hover:text-[#FACC15]"
                                    )} />
                                    {!isCollapsed && <span className="truncate text-[13px]">{item.label}</span>}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#0E1217] text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border-2 border-black dark:border-white shadow-retro-sm">
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
        <div className="flex h-screen bg-[#FAF6ED] dark:bg-[#0E1217] bg-retro-grid text-black dark:text-white overflow-hidden font-sans relative">
            {/* Desktop Sidebar (Left) */}
            <aside 
                className={cn(
                    "m-3 sm:m-4 rounded-2xl bg-white dark:bg-[#151B22] border-2 border-black dark:border-white flex flex-col shadow-retro-md relative z-20 hidden lg:flex transition-all duration-300 ease-in-out",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Collapse Toggle Button */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-32 w-7 h-7 rounded-none bg-white dark:bg-[#151B22] border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white hover:bg-[#FACC15] hover:text-black shadow-retro-xs z-50 transition-all cursor-pointer btn-retro"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="h-[90px] relative border-b border-black/10 dark:border-white/10 transition-all duration-500 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-3 px-4 group">
                        <HagLogo size="md" useImage={false} />
                        {!isCollapsed && (
                            <div className="flex flex-col justify-center gap-[1px] leading-none transition-all duration-500">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">Haikal Al Ghifari</span>
                                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-500 dark:text-[#FACC15]">QA PORTFOLIO</span>
                            </div>
                        )}
                    </Link>
                </div>
                <SidebarLinks />

                {/* Sidebar Footer Branding */}
                <div className="p-6 mt-auto border-t border-black/10 dark:border-white/10">
                    {!isCollapsed ? (
                        <div className="flex flex-col gap-1 transition-all duration-500">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-400 uppercase tracking-[0.2em] leading-tight">Haikal Al Ghifari</p>
                            <div className="flex items-center justify-between">
                                <p className="text-[9px] font-semibold text-amber-500 dark:text-[#FACC15] uppercase tracking-widest">QA Portfolio CMS</p>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">System Live</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-black text-amber-500 dark:text-[#FACC15] uppercase vertical-rl tracking-widest">HAG CMS</span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Mobile Top Header */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#FAF6ED]/95 dark:bg-[#0E1217]/95 backdrop-blur-md border-b-2 border-black dark:border-white z-[100] px-3 sm:px-4 flex items-center justify-between transition-all duration-300">
                    <Link href="/" className="flex items-center gap-1.5 sm:gap-2 active:scale-95 transition-transform min-w-0 max-w-[65%]">
                        <HagLogo size="sm" useImage={false} />
                        <div className="flex flex-col leading-[1.1] min-w-0">
                            <span className="text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-slate-900 dark:text-white truncate">Haikal Al Ghifari</span>
                            <span className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-widest text-amber-500 dark:text-[#FACC15] truncate">QA PORTFOLIO</span>
                        </div>
                    </Link>
                    
                    <div className="shrink-0 flex items-center gap-1 sm:gap-1.5 p-1 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-xs">
                        <div className="scale-[0.85] origin-center -mx-1">
                            <ThemeSwitcher />
                        </div>
                        <div className="h-3 w-px bg-black/20 dark:bg-white/20 mx-0.5" />
                        <div className="scale-[0.85] origin-center -ml-1">
                            <AdminProfile />
                        </div>
                    </div>
                </header>

                <main 
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto overflow-x-hidden pt-16 sm:pt-20 pb-36 sm:pb-32 px-3 sm:px-6 md:px-8 lg:p-10 lg:pt-24 lg:pb-12 relative scroll-smooth"
                >
                    {/* Desktop Top Actions */}
                    <div className="hidden lg:flex absolute top-6 right-10 z-[50] items-center gap-3">
                        <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-xs">
                            <ThemeSwitcher />
                            <div className="h-4 w-px bg-black/20 dark:bg-white/20 mx-1" />
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
                    className="lg:hidden fixed bottom-[calc(10px+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-md h-13 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro z-[100] flex items-center justify-between px-1"
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
                                    "flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 h-10 rounded-none transition-all duration-150 relative px-0.5",
                                    isActive 
                                        ? "text-black dark:text-[#FACC15] font-black" 
                                        : "text-zinc-600 dark:text-zinc-400"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-4 h-4 transition-all duration-150 shrink-0",
                                    isActive ? "scale-105 text-amber-500 dark:text-[#FACC15]" : "scale-100"
                                )} />
                                <span className={cn(
                                    "text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-tight truncate max-w-full text-center leading-none",
                                    isActive ? "opacity-100 text-black dark:text-[#FACC15]" : "opacity-70"
                                )}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="mobile-nav-indicator"
                                        className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-[#FACC15] border border-black" 
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

