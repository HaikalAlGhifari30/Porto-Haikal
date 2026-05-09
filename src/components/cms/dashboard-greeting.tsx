"use client";

import { useState, useEffect } from "react";

export function DashboardGreeting() {
    const [adminName, setAdminName] = useState("Admin");

    useEffect(() => {
        const storedName = localStorage.getItem("adminName");
        if (storedName) {
            setAdminName(storedName);
        } else {
            setAdminName("Baroedak Como"); // Default value consistent with current branding
        }
    }, []);

    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-tight">
            Selamat Datang Kembali, <span className="text-blue-400">{adminName}.</span>
        </h2>
    );
}
