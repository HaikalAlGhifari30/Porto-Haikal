"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function CMSGuard({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const admin = localStorage.getItem("isAdmin");
            if (admin === "true") {
                setIsAuthorized(true);
            } else {
                router.push("/");
            }
        }
    }, [router]);

    if (!isAuthorized) {
        return <div className="h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">Memeriksa otorisasi...</div>;
    }

    return <>{children}</>;
}
