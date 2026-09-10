"use server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@better-auth/utils/password";

export async function login(formData: FormData) {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { success: false, error: "Email dan password wajib diisi." };
        }

        const user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        });

        if (!user) {
            return { success: false, error: "Email atau password yang Anda masukkan salah." };
        }

        const credentialAccount = user.accounts.find(a => a.providerId === "credential");
        
        if (!credentialAccount || !credentialAccount.password) {
            return { success: false, error: "Email atau password yang Anda masukkan salah." };
        }

        let isValid = false;
        try {
            isValid = await verifyPassword(credentialAccount.password, password);
        } catch (err) {
            console.error("Password verification error:", err);
        }

        if (!isValid) {
            return { success: false, error: "Email atau password yang Anda masukkan salah." };
        }

        return { success: true };
    } catch (error: any) {
        console.error("Login server action error:", error);
        return { success: false, error: "Terjadi kesalahan server saat login. Silakan coba lagi." };
    }
}

export async function logout() {
    return { success: true };
}

