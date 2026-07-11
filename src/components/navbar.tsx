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
import { Menu, X, LogIn, LayoutDashboard, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ThemeSwitcher } from "@/components/cms/theme-switcher";
import { useSafeLang } from "@/store/lang";

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

    const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
        const linkClass = cn(
            "font-medium transition-colors",
            mobile 
                ? "block py-3 text-base text-zinc-800 dark:text-zinc-200 hover:text-primary dark:hover:text-primary" 
                : "text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        );
        return (
            <>
                <Link href="/#home" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.home', 'Beranda')}</Link>
                <Link href="/#about" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.about', 'Tentang Kami')}</Link>
                <Link href="/#organization" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.organization', 'Organisasi')}</Link>
                <Link href="/#projects" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.projects', 'Proyek')}</Link>
                <Link href="/#gallery" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.gallery', 'Galeri')}</Link>
                <Link href="/#divisions" onClick={() => setIsMenuOpen(false)} className={linkClass}>{translate('nav.divisions', 'Divisi')}</Link>
            </>
        );
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#040816]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-white/[0.03] transition-all duration-500 h-14 md:h-16 flex items-center">
            <div className="container-original flex items-center justify-between w-full relative z-10">
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="PT Rizky Rijaya Karya Logo" className="h-7 md:h-8 lg:h-9 w-auto transition-transform group-hover:scale-105 dark:bg-white/95 dark:p-1.5 dark:rounded-lg" />
                    <div className="flex flex-col justify-center gap-[1px] md:gap-[2px] transition-transform group-hover:translate-x-1 duration-500">
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.25em] text-zinc-800 dark:text-white/90 leading-[1.1]">Rizky Rijaya</span>
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.25em] text-primary leading-[1.1]">Karya</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="flex items-center gap-4 mr-2">
                        <NavLinks />
                    </div>

                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/10 mr-2">
                        <button 
                            onClick={() => setLang('id')}
                            className={cn("px-3 py-1.5 rounded-full text-sm font-bold transition-all flex items-center justify-center", (mounted ? lang === 'id' : true) ? "bg-blue-50 dark:bg-blue-500/20 shadow-sm ring-1 ring-blue-200 dark:ring-blue-500/30" : "opacity-50 hover:opacity-100")}
                            title="Bahasa Indonesia"
                        >
                            <img src="https://flagcdn.com/w20/id.png" srcSet="https://flagcdn.com/w40/id.png 2x" width="20" alt="Indonesia" className="rounded-sm" />
                        </button>
                        <button 
                            onClick={() => setLang('en')}
                            className={cn("px-3 py-1.5 rounded-full text-sm font-bold transition-all flex items-center justify-center", (mounted ? lang === 'en' : false) ? "bg-blue-50 dark:bg-blue-500/20 shadow-sm ring-1 ring-blue-200 dark:ring-blue-500/30" : "opacity-50 hover:opacity-100")}
                            title="English"
                        >
                            <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="English" className="rounded-sm" />
                        </button>
                    </div>

                    {/* Theme Switcher */}
                    <ThemeSwitcher />

                    {isLoggedIn ? (
                        <Link href="/cms" className={cn(
                            buttonVariants({ variant: "outline" }),
                            "group relative rounded-full px-5 py-1.5 h-8.5 bg-black/5 dark:bg-white/5 border-slate-300/50 dark:border-white/10 hover:border-primary/50 hover:bg-primary/10 text-zinc-800 dark:text-white transition-all duration-500 overflow-hidden"
                        )}>
                            <span className="relative z-10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
                                {translate('nav.dashboard', 'Dasbor')}
                                <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ) : (
                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger render={
                                <Button
                                    variant="outline"
                                    className="group relative rounded-full px-5 py-1.5 h-8.5 bg-black/5 dark:bg-white/5 border-slate-300/50 dark:border-white/10 hover:border-primary/50 hover:bg-primary/10 text-zinc-800 dark:text-white transition-all duration-500 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
                                        {translate('nav.login', 'Masuk')}
                                        <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            } />
                            <DialogContent className="sm:max-w-[440px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-white/10 text-zinc-900 dark:text-white p-0 rounded-[2.5rem] shadow-2xl overflow-hidden border">
                                <div className="p-8 md:p-10">
                                    <DialogHeader className="mb-10 flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/logo.png" alt="PT Rizky Rijaya Karya Logo" className="h-14 w-auto dark:bg-white/95 dark:p-1.5 dark:rounded-xl" />
                                        </div>
                                        <DialogTitle className="text-3xl font-bold tracking-tight">{translate('auth.loginTitle', 'Selamat Datang Kembali')}</DialogTitle>
                                        <p className="text-zinc-500 text-sm mt-2 font-medium">{translate('auth.loginSubtitle', 'Silakan masuk ke akun Anda')}</p>
                                    </DialogHeader>
                                    <form action={handleLogin} className="space-y-6">
                                        <div className="space-y-2.5">
                                            <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black pl-1">{translate('auth.email', 'Alamat Email')}</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="admin@compro-rrk.com"
                                                className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/5 h-14 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all text-base px-5"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black pl-1">{translate('auth.password', 'Kata Sandi')}</Label>
                                            <div className="relative group">
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    className="bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-white/5 h-14 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all text-base px-5 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                                                {error}
                                            </div>
                                        )}
                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all mt-4"
                                        >
                                            {isPending ? "Authenticating..." : translate('auth.loginBtn', 'Masuk')}
                                        </Button>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Mobile Right Side - Theme Switcher + Hamburger */}
                <div className="lg:hidden flex items-center gap-2">
                    <ThemeSwitcher />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/5 p-6 space-y-2 flex flex-col shadow-2xl animate-in slide-in-from-top duration-300">
                    <NavLinks mobile />
                    <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex flex-col gap-4">
                        {/* Mobile Language Switcher */}
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-full border border-slate-200 dark:border-white/10 w-fit mx-auto">
                            <button 
                                onClick={() => setLang('id')}
                                className={cn("px-6 py-2 rounded-full text-lg transition-all flex items-center justify-center", (mounted ? lang === 'id' : true) ? "bg-blue-50 dark:bg-blue-500/20 shadow-sm scale-110 ring-1 ring-blue-200 dark:ring-blue-500/30" : "opacity-50 hover:opacity-100")}
                            >
                                <img src="https://flagcdn.com/w40/id.png" width="24" alt="Indonesia" className="rounded-sm" />
                            </button>
                            <button 
                                onClick={() => setLang('en')}
                                className={cn("px-6 py-2 rounded-full text-lg transition-all flex items-center justify-center", (mounted ? lang === 'en' : false) ? "bg-blue-50 dark:bg-blue-500/20 shadow-sm scale-110 ring-1 ring-blue-200 dark:ring-blue-500/30" : "opacity-50 hover:opacity-100")}
                            >
                                <img src="https://flagcdn.com/w40/gb.png" width="24" alt="English" className="rounded-sm" />
                            </button>
                        </div>
                        
                        {isLoggedIn ? (
                            <Link href="/cms" onClick={() => setIsMenuOpen(false)} className={cn(buttonVariants({ className: "w-full" }), "bg-primary hover:bg-primary/90 rounded-xl")}>
                                <LayoutDashboard className="w-4 h-4 mr-2" /> {translate('nav.dashboard', 'Dasbor')}
                            </Link>
                        ) : (
                            <Button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsLoginOpen(true);
                                }}
                                className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                            >
                                <LogIn className="w-4 h-4 mr-2" /> {translate('nav.login', 'Masuk')}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
