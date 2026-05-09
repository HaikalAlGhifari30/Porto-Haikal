"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        router.push("/");
    };

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-medium"
        >
            <LogOut className="w-5 h-5" />
            Keluar
        </button>
    );
}
