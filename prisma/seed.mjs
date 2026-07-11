/**
 * Seed script untuk membuat akun admin pertama kali.
 * Menggunakan algoritma hashing yang sama persis dengan Better-Auth:
 *   scrypt (via @noble/hashes) dengan format: "<salt_hex>:<key_hex>"
 * 
 * Run: node prisma/seed.mjs
 */

import { scryptAsync } from "@noble/hashes/scrypt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ── Helper: replicate Better-Auth's hashPassword ──────────────────────────────
function hexEncode(bytes) {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function hashPassword(password) {
    const saltBytes = new Uint8Array(16);
    // Use crypto from Node.js global (available in Node 19+) or fallback
    const { randomBytes } = await import("node:crypto");
    const saltRaw = randomBytes(16);
    saltRaw.copy(Buffer.from(saltBytes.buffer));
    const salt = hexEncode(saltBytes);

    const key = await scryptAsync(
        password.normalize("NFKC"),
        salt,
        { N: 16384, r: 16, p: 1, dkLen: 64, maxmem: 128 * 16384 * 16 * 2 }
    );
    return `${salt}:${hexEncode(key)}`;
}

// ── Main seed ──────────────────────────────────────────────────────────────────
async function main() {
    const email = "admin@compro-rrk.com";
    const password = "admin123";
    const name = "Admin PT RRK";

    console.log("🌱 Memulai proses seeding...\n");

    // Check apakah user sudah ada
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log(`⚠️  User dengan email "${email}" sudah ada. Seed dibatalkan.`);
        console.log(`   ID: ${existing.id}`);
        return;
    }

    // Hash password menggunakan scrypt (sama persis dengan Better-Auth)
    console.log("🔐 Menghash password...");
    const hashedPassword = await hashPassword(password);
    console.log("✅ Password berhasil di-hash.\n");

    // Buat user di tabel User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            role: "admin",
            emailVerified: new Date(),
        },
    });

    // Buat account (credential provider) di tabel Account
    await prisma.account.create({
        data: {
            accountId: user.id,
            providerId: "credential",
            userId: user.id,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    console.log("🎉 Akun admin berhasil dibuat!");
    console.log("─────────────────────────────────");
    console.log(`   Email    : ${email}`);
    console.log(`   Password : ${password}`);
    console.log(`   Role     : admin`);
    console.log(`   ID       : ${user.id}`);
    console.log("─────────────────────────────────");
    console.log("\n✅ Seeding selesai. Silakan login di http://localhost:3000");
}

main()
    .catch((e) => {
        console.error("❌ Error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
