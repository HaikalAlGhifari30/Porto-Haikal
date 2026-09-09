"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn, LayoutDashboard, Eye, EyeOff, Download, Globe, Moon, Sun, Settings } from "lucide-react";
import { ThemeSwitcher } from "@/components/cms/theme-switcher";
import { useSafeLang } from "@/store/lang";
import { HagLogo } from "@/components/hag-logo";

interface NavbarProps {
  settings?: any;
  activeSceneIndex?: number;
  onNavigateScene?: (index: number) => void;
}

export function Navbar({ settings, activeSceneIndex = 0, onNavigateScene }: NavbarProps) {
  const cvUrl = (settings?.heroCtaLink && settings.heroCtaLink !== "#" && settings.heroCtaLink !== "#projects")
    ? settings.heroCtaLink
    : "/cv-haikal-al-ghifari.pdf";
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { lang, setLang, t } = useSafeLang();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const admin = localStorage.getItem("isAdmin");
      if (admin === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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
    { sceneIdx: 0, href: "#home", label: translate('nav.home', 'HOME') },
    { sceneIdx: 1, href: "#about", label: translate('nav.about', 'ABOUT') },
    { sceneIdx: 2, href: "#skills", label: translate('nav.skills', 'SKILLS') },
    { sceneIdx: 3, href: "#experience", label: translate('nav.experience', 'EXPERIENCE') },
    { sceneIdx: 4, href: "#projects", label: translate('nav.projects', 'PROJECTS') },
    { sceneIdx: 5, href: "#contact", label: translate('nav.contact', 'CONTACT') },
  ];

  const handleNavClick = (idx: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigateScene) {
      onNavigateScene(idx);
    }
  };

  return (
    <>
      {/* Top Fixed Header Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-slate-950/50 backdrop-blur-2xl border-b border-white/60 dark:border-cyan-500/20 shadow-lg shadow-blue-900/5 dark:shadow-cyan-950/30 transition-all duration-300 h-16 flex items-center">
        <div className="container-original relative flex items-center justify-between w-full px-3 md:px-8 mx-auto h-full gap-2">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-2 shrink-0 group text-left cursor-pointer z-10"
            title="Haikal Al Ghifari — HAG"
          >
            <HagLogo size="md" useImage={false} />
          </button>

          {/* Central 6-Menu Header Navigation Links (Desktop md+ only) */}
          <div className="hidden md:flex flex-1 items-center justify-center z-10 py-1">
            <div className="flex items-center gap-1 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/70 dark:border-cyan-500/20 shadow-2xs whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = activeSceneIndex === item.sceneIdx;
                return (
                  <button
                    key={item.sceneIdx}
                    onClick={(e) => handleNavClick(item.sceneIdx, e)}
                    className={cn(
                      "relative px-3 md:px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 shrink-0",
                      isActive
                        ? "text-white dark:text-cyan-300 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/25"
                        : "text-slate-900 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top Bar Action Cluster (Download CV & Settings Burger Menu) */}
          <div className="flex items-center gap-2 shrink-0 z-10 relative" ref={menuRef}>
            
            {/* Download CV CTA */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full px-3.5 py-1.5 h-9 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-1.5"
              )}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{translate('nav.downloadCv', 'Unduh CV')}</span>
            </a>

            {/* Burger Menu Button (Language, Theme, Nav & Admin Login) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-2xs",
                isMenuOpen
                  ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30"
                  : "bg-white/50 dark:bg-zinc-900/80 border-white/80 dark:border-zinc-800 text-slate-900 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800"
              )}
              aria-label="Pengaturan & Akun"
              title="Pengaturan & Akun"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 transition-transform rotate-90" />
              ) : (
                <Menu className="w-4 h-4 transition-transform" />
              )}
            </button>

            {/* Compact Settings & Mobile Navigation Popover */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 z-50 w-72 sm:w-80 bg-white/95 dark:bg-[#081026]/95 backdrop-blur-2xl border border-white/80 dark:border-cyan-500/30 rounded-2xl p-4 shadow-2xl shadow-slate-900/20 dark:shadow-cyan-950/50 animate-in fade-in zoom-in-95 duration-200">
                {/* Pointer Tip pointing to burger button */}
                <div className="absolute -top-1.5 right-3.5 w-3 h-3 bg-white dark:bg-[#081026] border-t border-l border-white/80 dark:border-cyan-500/30 rotate-45" />

                {/* Mobile Navigation Section (< md) */}
                <div className="md:hidden pb-3 mb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">Navigation</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {navItems.map((item) => {
                      const isActive = activeSceneIndex === item.sceneIdx;
                      return (
                        <button
                          key={item.sceneIdx}
                          onClick={(e) => {
                            handleNavClick(item.sceneIdx, e);
                            setIsMenuOpen(false);
                          }}
                          className={cn(
                            "w-full px-3 py-2 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between text-left",
                            isActive
                              ? "text-white dark:text-cyan-300 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/25"
                              : "text-slate-800 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/70"
                          )}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-zinc-800/80 mb-3">
                  <span className="text-xs font-bold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Options</span>
                  </span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-full font-semibold border border-cyan-500/20">
                    Preferences
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Language Switcher Row */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      <span>Language</span>
                    </span>
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 p-1 rounded-full border border-slate-200 dark:border-zinc-800">
                      <button 
                        onClick={() => setLang('id')}
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer",
                          (mounted ? lang === 'id' : true) ? "bg-blue-600 text-white shadow-xs" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        )}
                        title="Bahasa Indonesia"
                      >
                        ID
                      </button>
                      <button 
                        onClick={() => setLang('en')}
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer",
                          (mounted ? lang === 'en' : false) ? "bg-blue-600 text-white shadow-xs" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        )}
                        title="English"
                      >
                        EN
                      </button>
                    </div>
                  </div>

                  {/* Theme Switcher Row */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200/60 dark:border-zinc-800/60">
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-indigo-400 dark:inline hidden" />
                      <Sun className="w-3.5 h-3.5 text-amber-500 dark:hidden inline" />
                      <span>Theme</span>
                    </span>
                    <div className="flex items-center">
                      <ThemeSwitcher />
                    </div>
                  </div>

                  {/* Admin Access / Login Row */}
                  <div className="pt-1">
                    {isLoggedIn ? (
                      <Link
                        href="/cms"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:text-white hover:border-cyan-400 text-xs font-bold transition-all"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dasbor CMS Admin</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLoginOpen(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-cyan-500/10 border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/30 text-zinc-700 dark:text-zinc-300 hover:text-cyan-400 text-xs font-bold transition-all cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Login Admin</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </nav>

      {/* Admin Login Dialog Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[420px] bg-[#070e20]/95 border border-cyan-500/30 text-white p-0 rounded-[2.2rem] shadow-[0_0_60px_rgba(34,211,238,0.2)] overflow-hidden backdrop-blur-2xl">
          <div className="p-8 relative">
            <DialogHeader className="mb-6 flex flex-col items-center text-center relative z-10">
              <HagLogo size="lg" useImage={false} className="mb-4" />
              <DialogTitle className="text-2xl font-black tracking-tight text-white">{translate('auth.loginTitle', 'Selamat Datang Kembali')}</DialogTitle>
              <p className="text-zinc-400 text-xs mt-1.5 font-medium">{translate('auth.loginSubtitle', 'Silakan masuk ke akun admin Anda')}</p>
            </DialogHeader>
            <form action={handleLogin} className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-zinc-300">{translate('auth.email', 'Alamat Email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@haikalalghifari.dev"
                  className="bg-[#0c142c] border border-slate-700/80 dark:border-cyan-500/30 h-11 rounded-xl text-sm px-4 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-semibold text-zinc-300">{translate('auth.password', 'Kata Sandi')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="bg-[#0c142c] border border-slate-700/80 dark:border-cyan-500/30 h-11 rounded-xl text-sm px-4 pr-10 text-white placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-400 transition-colors"
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
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 h-11 rounded-xl font-bold text-sm text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-2"
              >
                {isPending ? "Authenticating..." : translate('auth.loginBtn', 'Masuk')}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

