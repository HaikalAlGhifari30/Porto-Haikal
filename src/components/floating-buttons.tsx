"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSafeLang } from "@/store/lang";

interface WhatsAppAdmin {
    id: string;
    name: string;
    phone: string;
    message: string;
    isActive: boolean;
}

export function FloatingButtons({ admins }: { admins: WhatsAppAdmin[] }) {
    const { t } = useSafeLang();
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [isWaOpen, setIsWaOpen] = useState(false);

    // Active admins only
    const activeAdmins = admins.filter(admin => admin.isActive);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleAdminClick = (phone: string, message: string) => {
        // Clean phone number: remove non-digits, leading zero replaced with 62 (if applicable)
        let cleanedPhone = phone.replace(/\D/g, '');
        if (cleanedPhone.startsWith('0')) {
            cleanedPhone = '62' + cleanedPhone.slice(1);
        }
        
        const text = encodeURIComponent(message || "Halo, saya ingin bertanya...");
        window.open(`https://wa.me/${cleanedPhone}?text=${text}`, '_blank');
        setIsWaOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            
            {/* WhatsApp Modal Popup */}
            {isWaOpen && (
                <div className="absolute bottom-20 right-0 w-72 sm:w-80 bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
                    <div className="bg-emerald-500 p-4 text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            <h3 className="font-bold">{t('chat.title')}</h3>
                        </div>
                        <button onClick={() => setIsWaOpen(false)} className="text-white/80 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-4 bg-slate-50 dark:bg-zinc-900/50">
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mb-3">{t('chat.desc')}</p>
                        
                        {activeAdmins.length === 0 ? (
                            <p className="text-sm text-slate-400 text-center py-4 italic">{t('chat.noAdmin')}</p>
                        ) : (
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                                {activeAdmins.map((admin) => (
                                    <button
                                        key={admin.id}
                                        onClick={() => handleAdminClick(admin.phone, admin.message)}
                                        className="w-full flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:border-emerald-500/50 hover:shadow-md transition-all text-left group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors">
                                            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{admin.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">Online</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* WhatsApp Trigger Button */}
            <button
                onClick={() => setIsWaOpen(!isWaOpen)}
                className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative group"
                aria-label="WhatsApp Us"
            >
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
                {isWaOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
                
                {/* Tooltip */}
                {!isWaOpen && (
                    <span className="absolute right-full mr-4 bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {t('chat.tooltip')}
                    </span>
                )}
            </button>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={cn(
                    "w-12 h-12 bg-slate-700 hover:bg-slate-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center",
                    showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                )}
                aria-label="Back to top"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </div>
    );
}
