"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CMSGuard({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const admin = localStorage.getItem("isAdmin");
            if (admin === "true") {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                router.push("/");
            }
        }
    }, [router]);

    if (isAuthorized === null) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500 animate-pulse">Memeriksa otorisasi...</p>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
