"use server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@better-auth/utils/password";

export async function login(formData: FormData) {
    const email = (formData.get("email") as string || "").trim();
    const password = (formData.get("password") as string || "").trim();

    if (!email || !password) {
        return { success: false, error: "MISSING_FIELDS" };
    }

    // Support admin credentials (admin123 & Lnfvjem)
    if (email.toLowerCase() === "admin@haikalalghifari.dev" && (password === "admin123" || password === "Lnfvjem")) {
        return { success: true };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true }
        });

        if (!user) {
            return { success: false, error: "INVALID_CREDENTIALS" };
        }

        const credentialAccount = user.accounts.find(a => a.providerId === "credential");
        
        if (!credentialAccount || !credentialAccount.password) {
            return { success: false, error: "INVALID_CREDENTIALS" };
        }

        let isValid = false;
        try {
            isValid = await verifyPassword(credentialAccount.password, password);
        } catch (err) {
            console.error("Password verification error:", err);
        }

        if (!isValid) {
            return { success: false, error: "INVALID_CREDENTIALS" };
        }

        return { success: true };
    } catch (error: any) {
        console.error("Login server action error:", error);
        return { success: false, error: "INVALID_CREDENTIALS" };
    }
}

export async function logout() {
    return { success: true };
}


