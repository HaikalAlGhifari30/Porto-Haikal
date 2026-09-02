"use client";

import { useState, useEffect } from "react";

export function DashboardGreeting() {
    const [adminName, setAdminName] = useState("Haikal Al Ghifari, S.Kom");

    useEffect(() => {
        // Force cleanup of old corporate names from localStorage
        const storedName = localStorage.getItem("adminName");
        if (!storedName || storedName.includes("Rizk") || storedName.includes("Karya") || storedName.includes("Como") || storedName.includes("PT") || storedName.includes("Admin")) {
            localStorage.setItem("adminName", "Haikal Al Ghifari, S.Kom");
            setAdminName("Haikal Al Ghifari, S.Kom");
        } else {
            setAdminName(storedName);
        }
    }, []);

    return (
        <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2 leading-tight text-white">
            Selamat Datang Kembali, <span className="text-cyan-400">{adminName}.</span>
        </h2>
    );
}
