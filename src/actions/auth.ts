"use server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@better-auth/utils/password";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
        where: { email },
        include: { accounts: true }
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const credentialAccount = user.accounts.find(a => a.providerId === "credential");
    
    if (!credentialAccount || !credentialAccount.password) {
        throw new Error("Invalid credentials");
    }

    const isValid = await verifyPassword(credentialAccount.password, password);

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    return { success: true };
}

export async function logout() {
    // Handle logout logic
}
