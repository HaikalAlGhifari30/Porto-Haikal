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

export function Navbar() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const admin = localStorage.getItem("isAdmin");
            if (admin === "true") {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const handleLogin = async (formData: FormData) => {
        try {
            await login(formData);
            localStorage.setItem("isAdmin", "true");
            setIsLoggedIn(true);
            setIsLoginOpen(false);
            toast.success("Login Berhasil");
            router.push("/cms");
        } catch (e: any) {
            setError(e.message || "Login failed");
        }
    };

    const NavLinks = () => (
        <>
            <Link href="/#home" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/#projects" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Projects</Link>
            <Link href="/#divisions" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Divisions</Link>
        </>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#040816]/70 backdrop-blur-md border-b border-white/[0.03] transition-all duration-500 h-14 md:h-16 flex items-center">
            <div className="container-original flex items-center justify-between w-full relative z-10">
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="Logo" className="h-7 md:h-8 lg:h-9 w-auto transition-transform group-hover:scale-105" />
                    <div className="flex flex-col justify-center gap-[1px] md:gap-[2px] transition-transform group-hover:translate-x-1 duration-500">
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/90 leading-[1.1]">Baroedak</span>
                        <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.25em] text-primary leading-[1.1]">COMO</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-6 mr-4">
                        <NavLinks />
                    </div>
                    {isLoggedIn ? (
                        <Link href="/cms" className={cn(
                            buttonVariants({ variant: "outline" }),
                            "group relative rounded-full px-5 py-1.5 h-8.5 bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white transition-all duration-500 overflow-hidden"
                        )}>
                            <span className="relative z-10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
                                Dashboard
                                <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ) : (
                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger render={
                                <Button
                                    variant="outline"
                                    className="group relative rounded-full px-5 py-1.5 h-8.5 bg-white/5 border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white transition-all duration-500 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em]">
                                        Login
                                        <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" />
                                    </span>
                                </Button>
                            } />
                            <DialogContent className="sm:max-w-[440px] bg-zinc-950 border-white/10 text-white p-0 rounded-[2.5rem] shadow-2xl overflow-hidden border">
                                <div className="p-8 md:p-10">
                                    <DialogHeader className="mb-10 flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                                            <img src="/logo.png" alt="Logo" className="h-14 w-auto brightness-200" />
                                        </div>
                                        <DialogTitle className="text-3xl font-bold tracking-tight">Admin Login</DialogTitle>
                                        <p className="text-zinc-500 text-sm mt-2 font-medium">Access your dashboard to manage content.</p>
                                    </DialogHeader>
                                    <form action={handleLogin} className="space-y-6">
                                        <div className="space-y-2.5">
                                            <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black pl-1">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="admin@como.com"
                                                className="bg-zinc-900/50 border-white/5 h-14 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all text-base px-5"
                                            />
                                        </div>
                                        <div className="space-y-2.5">
                                            <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black pl-1">Password</Label>
                                            <div className="relative group">
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    placeholder="••••••••"
                                                    className="bg-zinc-900/50 border-white/5 h-14 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary/50 transition-all text-base px-5 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
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
                                            Sign In to Dashboard
                                        </Button>
                                    </form>
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Mobile Hamburger Icon */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/5 p-6 space-y-6 flex flex-col shadow-2xl animate-in slide-in-from-top duration-300">
                    <NavLinks />
                    <div className="pt-4 border-t border-white/5">
                        {isLoggedIn ? (
                            <Link href="/cms" onClick={() => setIsMenuOpen(false)} className={cn(buttonVariants({ className: "w-full" }), "bg-primary hover:bg-primary/90 rounded-xl")}>
                                <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                            </Link>
                        ) : (
                            <Button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsLoginOpen(true);
                                }}
                                className="w-full bg-primary hover:bg-primary/90 rounded-xl"
                            >
                                <LogIn className="w-4 h-4 mr-2" /> Login
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

