"use client";

import Link from "next/link";
import { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, Settings, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CMSGuard } from "@/components/cms-guard";
import { ThemeSwitcher } from "@/components/cms/theme-switcher";
import { AdminProfile } from "@/components/cms/admin-profile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function CMSLayout({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const SidebarLinks = () => {
        const menuItems = [
            { href: "/cms", label: "Dashboard", icon: LayoutDashboard },
            { href: "/cms/projects", label: "Proyek", icon: FolderKanban },
            { href: "/cms/teams", label: "Divisi", icon: Users },
            { href: "/cms/settings", label: "Pengaturan", icon: Settings },
        ];

        return (
            <nav className="flex-1 py-4 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href));
                    return (
                        <Link 
                            key={item.href}
                            href={item.href} 
                            onClick={() => setIsSidebarOpen(false)} 
                            className={cn(
                                "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 group relative",
                                isActive 
                                    ? "bg-[#142346]/75 backdrop-blur-md text-white border border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.1)] font-bold" 
                                    : "text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium",
                                isCollapsed && "px-2.5 justify-center"
                            )}
                        >
                            <item.icon className={cn(
                                "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 shrink-0",
                                isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
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
            </nav>
        );
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-slate-900 dark:text-slate-50 overflow-hidden font-sans transition-colors duration-300 relative">
            {/* Desktop Sidebar (Left) */}
            <aside 
                className={cn(
                    "m-4 rounded-[2rem] bg-white/90 dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-800/50 flex flex-col shadow-2xl relative z-20 hidden lg:flex transition-all duration-500 ease-in-out",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* Collapse Toggle Button */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-32 w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center text-slate-400 hover:text-blue-500 shadow-xl z-50 transition-all hover:scale-110 active:scale-95"
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                <div className="h-[100px] relative border-b border-slate-100 dark:border-zinc-800/50 transition-all duration-500 flex items-center justify-center">
                    <Link href="/" className="flex items-center gap-3 px-4 group">
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            className={cn(
                                "object-contain transition-all duration-500 group-hover:scale-105",
                                isCollapsed ? "h-9" : "h-11"
                            )} 
                        />
                        {!isCollapsed && (
                            <div className="flex flex-col justify-center gap-[1px] leading-none transition-all duration-500">
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 dark:text-white/90">Baroedak</span>
                                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600">COMO</span>
                            </div>
                        )}
                    </Link>
                </div>
                <SidebarLinks />

                {/* Sidebar Footer Branding */}
                <div className="p-6 mt-auto border-t border-slate-100 dark:border-zinc-800/50">
                    {!isCollapsed ? (
                        <div className="flex flex-col gap-1 transition-all duration-500">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em] leading-tight">Baroedak COMO</p>
                            <div className="flex items-center justify-between">
                                <p className="text-[9px] font-medium text-slate-300 dark:text-zinc-600 uppercase tracking-widest">v1.2.6 Premium</p>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-bold text-emerald-500/60 uppercase tracking-tighter">System Live</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-black text-slate-300 dark:text-zinc-700 uppercase vertical-rl tracking-widest">COMO v1.2</span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                {/* Mobile Top Header */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-zinc-800/50 z-[100] px-4 flex items-center justify-between shadow-sm">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                        <div className="flex flex-col leading-none">
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Baroedak</span>
                            <span className="text-[8px] font-black uppercase tracking-wider text-blue-600">COMO</span>
                        </div>
                    </Link>
                    
                    <div className="flex items-center gap-2 p-1 rounded-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <ThemeSwitcher />
                        <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800/60 mx-1"></div>
                        <AdminProfile />
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto pt-20 pb-28 px-4 md:px-8 lg:p-10 lg:pt-24 lg:pb-10 relative z-0 scroll-smooth">
                    {/* Desktop Top Actions (Hidden on Mobile) */}
                    <div className="hidden lg:flex absolute top-6 right-10 z-[50] items-center gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-slate-200/20 dark:shadow-none animate-in fade-in slide-in-from-top-2 duration-700">
                            <ThemeSwitcher />
                            <div className="h-4 w-px bg-slate-200 dark:bg-zinc-800/60 mx-1"></div>
                            <AdminProfile />
                        </div>
                    </div>

                    <CMSGuard>
                        <div className="max-w-[1400px] mx-auto">
                            {children}
                        </div>
                    </CMSGuard>
                </main>

                {/* Refined Mobile Bottom Navigation */}
                <nav className="lg:hidden fixed bottom-6 left-4 right-4 h-16 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-slate-200 dark:border-zinc-800 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none z-[100] flex items-center justify-around px-2">
                    {[
                        { href: "/cms", label: "Home", icon: LayoutDashboard },
                        { href: "/cms/projects", label: "Proyek", icon: FolderKanban },
                        { href: "/cms/teams", label: "Divisi", icon: Users },
                        { href: "/cms/settings", label: "Settings", icon: Settings },
                    ].map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/cms" && pathname.startsWith(item.href));
                        return (
                            <Link 
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-2xl transition-all duration-300",
                                    isActive 
                                        ? "text-blue-600 dark:text-blue-400" 
                                        : "text-slate-400 dark:text-zinc-500 hover:text-blue-500"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 transition-transform",
                                    isActive && "scale-110"
                                )} />
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest",
                                    isActive ? "opacity-100" : "opacity-60"
                                )}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="mobile-nav-indicator"
                                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

