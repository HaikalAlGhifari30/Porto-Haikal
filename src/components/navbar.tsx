"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, LayoutDashboard, Eye, EyeOff, Download, Home, User, Layers, Briefcase, FolderGit2, GraduationCap, Users, MessageSquare, ChevronRight } from "lucide-react";
import { ThemeSwitcher } from "@/components/cms/theme-switcher";
import { useSafeLang } from "@/store/lang";
import { HagLogo } from "@/components/hag-logo";

export function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { lang, setLang, t } = useSafeLang();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const admin = localStorage.getItem("isAdmin");
            if (admin === "true") {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const translate = (key: string, fallback: string) => {
        return mounted ? t(key) : fallback;
    };

    const handleLogin = async (formData: FormData) => {
        setIsPending(true);
        setError("");
        try {
            await login(formData);
            localStorage.setItem("isAdmin", "true");
            setIsLoggedIn(true);
            setIsLoginOpen(false);
            toast.success("Login Berhasil");
            router.push("/cms");
        } catch (e: any) {
            setError(e.message || "Login failed");
        } finally {
            setIsPending(false);
        }
    };

    const navItems = [
        { href: "/#home", label: translate('nav.home', 'Beranda'), icon: <Home className="w-4 h-4 text-cyan-400" /> },
        { href: "/#about", label: translate('nav.about', 'Tentang Saya'), icon: <User className="w-4 h-4 text-blue-400" /> },
        { href: "/#skills", label: translate('nav.skills', 'Keahlian QA'), icon: <Layers className="w-4 h-4 text-indigo-400" /> },
        { href: "/#experience", label: translate('nav.experience', 'Pengalaman'), icon: <Briefcase className="w-4 h-4 text-purple-400" /> },
        { href: "/#projects", label: translate('nav.projects', 'Portofolio QA'), icon: <FolderGit2 className="w-4 h-4 text-cyan-400" /> },
        { href: "/#education", label: translate('nav.education', 'Pendidikan'), icon: <GraduationCap className="w-4 h-4 text-emerald-400" /> },
        { href: "/#organization", label: translate('nav.organization', 'Organisasi'), icon: <Users className="w-4 h-4 text-amber-400" /> },
        { href: "/#contact", label: translate('nav.contact', 'Kontak'), icon: <MessageSquare className="w-4 h-4 text-rose-400" /> },
    ];

    return (
        <>
            {/* Top Fixed Header Navbar (macOS Frosted Glassmorphism) */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/65 dark:bg-[#070e20]/75 backdrop-blur-2xl border-b border-slate-200/70 dark:border-cyan-500/20 shadow-md shadow-slate-900/5 dark:shadow-cyan-950/30 transition-all duration-300 h-16 flex items-center">
                <div className="container-original flex items-center justify-between w-full px-4 md:px-8 mx-auto">
                    
                    {/* Brand Logo Only */}
                    <Link href="/" className="flex items-center gap-3 shrink-0 group" title="Haikal Al Ghifari — HAG">
                        <HagLogo size="md" useImage={false} />
                    </Link>

                    {/* Top Bar Action Cluster (Right Side) */}
                    <div className="flex items-center gap-3">
                        
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-slate-200/80 dark:border-zinc-800 shadow-2xs">
                            <button 
                                onClick={() => setLang('id')}
                                className={cn("px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center justify-center", (mounted ? lang === 'id' : true) ? "bg-blue-600 text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white")}
                                title="Bahasa Indonesia"
                            >
                                ID
                            </button>
                            <button 
                                onClick={() => setLang('en')}
                                className={cn("px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center justify-center", (mounted ? lang === 'en' : false) ? "bg-blue-600 text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white")}
                                title="English"
                            >
                                EN
                            </button>
                        </div>

                        {/* Theme Switcher */}
                        <ThemeSwitcher />

                        {/* Download CV CTA */}
                        <a
                            href="/cv-haikal-al-ghifari.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "hidden sm:flex rounded-full px-4 py-1.5 h-9 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 items-center gap-2"
                            )}
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>{translate('nav.downloadCv', 'Unduh CV')}</span>
                        </a>

                        {/* Hamburger Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-500/40 transition-all duration-300 flex items-center gap-2 group shadow-2xs cursor-pointer"
                            aria-label="Toggle Navigation Menu"
                        >
                            <span className="hidden md:inline text-xs font-bold tracking-wide uppercase group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                                {isMenuOpen ? "Tutup" : "Menu"}
                            </span>
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-blue-600 dark:text-cyan-400 transition-transform group-hover:rotate-90" />
                            ) : (
                                <Menu className="w-5 h-5 text-blue-600 dark:text-cyan-400 transition-transform group-hover:scale-110" />
                            )}
                        </button>

                    </div>

                </div>
            </nav>

            {/* Slide-over Drawer Backdrop (Full Screen Fixed Z-50) */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Slide-over Drawer Panel (macOS Frosted Glass Drawer) */}
            <aside
                className={cn(
                    "fixed top-0 right-0 bottom-0 z-50 w-80 md:w-96 bg-white/95 dark:bg-[#070e20]/95 text-zinc-900 dark:text-white border-l border-slate-200/80 dark:border-cyan-500/20 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto backdrop-blur-3xl transition-transform duration-300 ease-in-out",
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Drawer Top Header */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-zinc-800/80 pb-4">
                        <div className="flex items-center gap-3">
                            <HagLogo size="sm" useImage={false} />
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">Haikal Al Ghifari</span>
                                <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-semibold uppercase">Quality Assurance Engineer</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Menu Navigation Links List */}
                    <div className="space-y-1.5">
                        {navItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/50 hover:border-blue-500/40 hover:bg-slate-200/80 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-white transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 group-hover:scale-110 transition-transform shadow-2xs">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-semibold">{item.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 mt-6">
                    <a
                        href="/cv-haikal-al-ghifari.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "w-full rounded-2xl py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                        )}
                    >
                        <Download className="w-4 h-4" />
                        <span>{translate('nav.downloadCv', 'Unduh CV')}</span>
                    </a>

                    {/* Admin Access Button */}
                    {isLoggedIn ? (
                        <Link
                            href="/cms"
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-blue-500/40 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-white flex items-center justify-center gap-2 transition-all"
                        >
                            <LayoutDashboard className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <span>{translate('nav.dashboard', 'Dasbor CMS')}</span>
                        </Link>
                    ) : (
                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger render={
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                                >
                                    <LogIn className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                                    <span>{translate('nav.login', 'Admin Login')}</span>
                                </button>
                            } />
                            <DialogContent className="sm:max-w-[420px] bg-zinc-950 border-zinc-800 text-white p-0 rounded-3xl shadow-2xl overflow-hidden border">
                                <div className="p-8">
                                    <DialogHeader className="mb-6 flex flex-col items-center text-center">
                                        <HagLogo size="lg" useImage={false} className="mb-4" />
                                        <DialogTitle className="text-2xl font-bold tracking-tight">{translate('auth.loginTitle', 'Selamat Datang Kembali')}</DialogTitle>
                                        <p className="text-zinc-400 text-xs mt-1.5 font-medium">{translate('auth.loginSubtitle', 'Silakan masuk ke akun admin Anda')}</p>
                                    </DialogHeader>
                                    <form action={handleLogin} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-semibold text-zinc-400">{translate('auth.email', 'Alamat Email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="admin@haikalalghifari.dev"
                                                className="bg-zinc-900 border-zinc-800 h-11 rounded-xl text-sm px-4 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-xs font-semibold text-zinc-400">{translate('auth.password', 'Kata Sandi')}</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    className="bg-zinc-900 border-zinc-800 h-11 rounded-xl text-sm px-4 pr-10 text-white"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
                                                {error}
                                            </div>
                                        )}
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 mt-2"
                                        >
                                            {isPending ? "Authenticating..." : translate('auth.loginBtn', 'Masuk')}
                                        </Button>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

            </aside>
        </>
    );
}
