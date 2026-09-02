"use client";

import { useState, useEffect } from "react";

export function DashboardGreeting() {
    const [adminName, setAdminName] = useState("Haikal Al Ghifari, S.Kom");

    useEffect(() => {
        const storedName = localStorage.getItem("adminName");
        if (storedName && !storedName.toLowerCase().includes("rizky") && !storedName.toLowerCase().includes("como")) {
            setAdminName(storedName);
        } else {
            const newName = "Haikal Al Ghifari, S.Kom";
            setAdminName(newName);
            localStorage.setItem("adminName", newName);
        }
    }, []);

    return (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 leading-tight">
            Selamat Datang Kembali, <span className="text-cyan-400">{adminName}.</span>
        </h2>
    );
}
