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
import { Menu, X, LogIn, LayoutDashboard, Eye, EyeOff, Download, Globe, Moon, Sun, Settings, Lock } from "lucide-react";
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
      try {
        const admin = localStorage.getItem("isAdmin");
        if (admin === "true") {
          setIsLoggedIn(true);
        }
      } catch {
        // Ignore storage error in restricted webviews
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
      const res = await login(formData);
      if (!res.success) {
        setError(res.error || "Email atau password yang Anda masukkan salah.");
        return;
      }
      localStorage.setItem("isAdmin", "true");
      setIsLoggedIn(true);
      setIsLoginOpen(false);
      toast.success("Login Berhasil");
      router.push("/cms");
    } catch (e: any) {
      setError(e.message || "Gagal masuk. Silakan coba lagi.");
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
      {/* Top Fixed Header Navbar (8-Bit Retro) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF6ED]/95 dark:bg-[#0E1217]/95 backdrop-blur-md border-b-2 border-black dark:border-white shadow-retro-sm transition-all duration-300 h-16 flex items-center">
        <div className="container-original relative flex items-center justify-between w-full px-3 md:px-8 mx-auto h-full gap-2">
          
          {/* Brand Logo with 8-Bit Pixel badge */}
          <button
            onClick={() => handleNavClick(0)}
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group text-left cursor-pointer z-10 btn-retro"
            title="Haikal Al Ghifari — HAG"
          >
            <HagLogo size="sm" />
            <div className="flex flex-col leading-none">
              <span className="font-pixel text-xs sm:text-sm font-black text-black dark:text-white tracking-wider">
                HAG
              </span>
              <span className="font-pixel text-[9px] font-bold text-zinc-600 dark:text-zinc-400 hidden sm:inline tracking-widest uppercase mt-0.5">
                PORTFOLIO
              </span>
            </div>
          </button>

          {/* Central 6-Menu Header Navigation Links (8-Bit Arcade Tab Style) */}
          <div className="hidden md:flex flex-1 items-center justify-center z-10 py-1">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {navItems.map((item) => {
                const isActive = activeSceneIndex === item.sceneIdx;
                return (
                  <button
                    key={item.sceneIdx}
                    onClick={(e) => handleNavClick(item.sceneIdx, e)}
                    className={cn(
                      "relative px-2 xl:px-3.5 py-1.5 border-2 border-black dark:border-white font-pixel text-[11px] xl:text-xs tracking-wide xl:tracking-wider transition-all cursor-pointer flex items-center gap-1 xl:gap-1.5 shrink-0 btn-retro",
                      isActive
                        ? "bg-[#FACC15] text-black font-black shadow-retro-sm scale-105"
                        : "bg-white dark:bg-[#151B22] text-black dark:text-white hover:bg-yellow-200 dark:hover:bg-zinc-800 shadow-retro-sm"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="relative flex h-2 w-2 shrink-0 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-black/40" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Top Bar Action Cluster (Download CV & Settings Burger Menu) */}
          <div className="flex items-center gap-2 shrink-0 z-10 relative" ref={menuRef}>
            
            {/* Download CV CTA (8-Bit Yellow Box) */}
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 h-9 bg-[#FACC15] hover:bg-[#EAB308] text-black font-pixel font-black text-xs border-2 border-black dark:border-white shadow-retro-sm btn-retro flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{translate('nav.downloadCv', 'Unduh CV')}</span>
            </a>

            {/* Burger Menu Button (Language, Theme, Nav & Admin Login) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2 h-9 w-9 border-2 border-black dark:border-white font-pixel transition-all flex items-center justify-center cursor-pointer shadow-retro-sm btn-retro",
                isMenuOpen
                  ? "bg-[#FACC15] text-black font-bold"
                  : "bg-white dark:bg-[#151B22] text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-zinc-800"
              )}
              aria-label="Pengaturan & Akun"
              title="Pengaturan & Akun"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

            {/* Compact Settings & Mobile Navigation Popover */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 z-50 w-72 sm:w-80 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white p-4 shadow-retro animate-in fade-in zoom-in-95 duration-150">
                {/* Pointer Tip pointing to burger button */}
                <div className="absolute -top-2 right-3.5 w-3.5 h-3.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-t-2 border-l-2 border-black dark:border-white rotate-45" />

                {/* Mobile Navigation Section (< md) */}
                <div className="md:hidden pb-3 mb-3 border-b-2 border-black dark:border-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-pixel font-black tracking-wider text-black dark:text-white uppercase">NAVIGATION</span>
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
                            "w-full px-3 py-2 border-2 border-black dark:border-white font-pixel text-xs tracking-wider transition-all cursor-pointer flex items-center justify-between text-left btn-retro",
                            isActive
                              ? "bg-[#FACC15] text-black font-black shadow-retro-sm"
                              : "bg-white dark:bg-[#151B22] text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-zinc-800"
                          )}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="relative flex h-2 w-2 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-black/40" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between pb-2.5 border-b-2 border-black dark:border-white mb-3">
                  <span className="text-xs font-pixel font-bold tracking-wider text-black dark:text-white uppercase flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-yellow-500" />
                    <span>OPTIONS</span>
                  </span>
                  <span className="text-[10px] font-pixel bg-[#FACC15] text-black px-2 py-0.5 font-bold border-2 border-black dark:border-white">
                    PREFERENCES
                  </span>
                </div>

                <div className="space-y-3 font-mono">
                  {/* Language Switcher Row */}
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-sm">
                    <span className="text-xs font-bold text-black dark:text-white flex items-center gap-2 font-pixel">
                      <Globe className="w-3.5 h-3.5 text-yellow-500" />
                      <span>LANGUAGE</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setLang('id')}
                        className={cn(
                          "px-2.5 py-0.5 border-2 border-black dark:border-white font-pixel text-[11px] font-bold transition-all cursor-pointer btn-retro",
                          (mounted ? lang === 'id' : false) ? "bg-[#FACC15] text-black font-black" : "bg-transparent text-black dark:text-white"
                        )}
                        title="Bahasa Indonesia"
                      >
                        ID
                      </button>
                      <button 
                        onClick={() => setLang('en')}
                        className={cn(
                          "px-2.5 py-0.5 border-2 border-black dark:border-white font-pixel text-[11px] font-bold transition-all cursor-pointer btn-retro",
                          (mounted ? lang === 'en' : true) ? "bg-[#FACC15] text-black font-black" : "bg-transparent text-black dark:text-white"
                        )}
                        title="English"
                      >
                        EN
                      </button>
                    </div>
                  </div>

                  {/* Theme Switcher Row */}
                  <div className="flex items-center justify-between p-2 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-sm">
                    <span className="text-xs font-bold text-black dark:text-white flex items-center gap-2 font-pixel">
                      <Moon className="w-3.5 h-3.5 text-yellow-400 dark:inline hidden" />
                      <Sun className="w-3.5 h-3.5 text-amber-500 dark:hidden inline" />
                      <span>THEME</span>
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
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border-2 border-black dark:border-white bg-[#FACC15] text-black font-pixel text-xs font-bold uppercase shadow-retro-xs btn-retro transition-all"
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
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 border-2 border-black dark:border-white bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs font-bold uppercase shadow-retro-xs btn-retro transition-all cursor-pointer"
                      >
                        <LogIn className="w-3.5 h-3.5" />
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

      {/* Admin Login Dialog Modal (8-Bit Neo-Brutalist Retro Box) */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[420px] bg-[#FAF6ED] dark:bg-[#151B22] border-3 sm:border-4 border-black dark:border-white text-black dark:text-white p-0 rounded-none shadow-retro-lg overflow-hidden gap-0"
        >
          {/* Retro Top Header Bar */}
          <div className="p-3 sm:p-3.5 bg-[#FACC15] border-b-2 border-black dark:border-white flex items-center justify-between text-black shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-black text-[#FACC15] border-2 border-black flex items-center justify-center shrink-0 shadow-retro-xs">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-pixel text-xs font-black tracking-wider uppercase flex items-center gap-1.5 leading-none truncate">
                  ADMIN CONSOLE
                  <span className="text-[9px] px-1 bg-black text-[#FACC15] font-mono shrink-0">v1.0</span>
                </h3>
                <p className="font-pixel text-[8px] sm:text-[9px] text-zinc-900 uppercase mt-1 leading-none truncate">
                  SYSTEM // AUTHENTICATION
                </p>
              </div>
            </div>

            {/* Retro [X] Close Button */}
            <button
              type="button"
              onClick={() => setIsLoginOpen(false)}
              className="w-8 h-8 bg-white border-2 border-black text-black font-bold shadow-retro-xs btn-retro flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Close"
            >
              <X className="w-4 h-4 font-bold stroke-[2.5]" />
            </button>
          </div>

          {/* Form Body Container */}
          <div className="p-6 sm:p-7 space-y-5 bg-[#FAF6ED] dark:bg-[#151B22]">
            <DialogHeader className="space-y-1 text-center pb-2 border-b-2 border-black/10 dark:border-white/10">
              <DialogTitle className="text-xl sm:text-2xl font-sans font-black uppercase tracking-tight text-black dark:text-white">
                {translate('auth.loginTitle', 'Selamat Datang Kembali')}
              </DialogTitle>
              <p className="font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                {translate('auth.loginSubtitle', 'Silakan masuk ke akun admin Anda')}
              </p>
            </DialogHeader>

            <form action={handleLogin} className="space-y-4 pt-1">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="font-sans text-xs font-black uppercase tracking-wider text-black dark:text-white block text-left"
                >
                  {translate('auth.email', 'Alamat Email')}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@haikalalghifari.dev"
                  className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none h-11 text-sm px-3.5 text-black dark:text-white font-mono placeholder:text-zinc-400 focus:bg-yellow-50 dark:focus:bg-zinc-900 shadow-retro-xs transition-all w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="font-sans text-xs font-black uppercase tracking-wider text-black dark:text-white block text-left"
                >
                  {translate('auth.password', 'Kata Sandi')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none h-11 text-sm px-3.5 pr-11 text-black dark:text-white font-mono placeholder:text-zinc-400 focus:bg-yellow-50 dark:focus:bg-zinc-900 shadow-retro-xs transition-all w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-white text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white shadow-retro-xs btn-retro transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-950/60 border-2 border-red-600 dark:border-red-500 text-red-700 dark:text-red-300 font-sans text-xs font-bold text-center shadow-retro-xs">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#FACC15] hover:bg-[#EAB308] text-black border-2 border-black dark:border-white rounded-none h-11 sm:h-12 font-sans font-black text-xs sm:text-sm uppercase tracking-wider shadow-retro-sm btn-retro transition-all cursor-pointer mt-3 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 font-bold" />
                <span>{isPending ? "Authenticating..." : translate('auth.loginBtn', 'Masuk')}</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

