/**
 * Seed script untuk membuat akun admin pertama kali.
 * Menggunakan algoritma hashing yang sama persis dengan Better-Auth:
 *   scrypt via node:crypto (format: "<salt_hex>:<key_hex>", N=16384, r=16, p=1, dkLen=64)
 *
 * Run: node prisma/seed.cjs
 */

require("dotenv").config();
const { scrypt, randomBytes } = require("node:crypto");
const { promisify } = require("node:util");
const { PrismaClient } = require("@prisma/client");

const scryptAsync = promisify(scrypt);
const prisma = new PrismaClient();

// ── Replicate Better-Auth's hashPassword ──────────────────────────────────────
// Source: node_modules/@better-auth/utils/dist/password.mjs
// Format: "<salt_hex>:<derived_key_hex>"
// Params: N=16384, r=16, p=1, dkLen=64
async function hashPassword(password) {
    const saltBytes = randomBytes(16);
    const salt = saltBytes.toString("hex");

    const normalized = password.normalize("NFKC");
    const key = await scryptAsync(normalized, salt, 64, {
        N: 16384,
        r: 16,
        p: 1,
        maxmem: 128 * 16384 * 16 * 2,
    });

    return `${salt}:${key.toString("hex")}`;
}

// ── Main seed ──────────────────────────────────────────────────────────────────
async function main() {
    const email = "admin@rizkirijayakarya.com";
    const password = "admin123";
    const name = "Admin PT Rizki Rijaya Karya";

    console.log("🌱 Memulai proses seeding...\n");

    // Cek apakah user sudah ada
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        console.log(`⚠️  User "${email}" sudah ada. Seed dibatalkan.`);
        console.log(`   ID: ${existing.id}`);
        return;
    }

    // Hash password
    console.log("🔐 Menghash password dengan scrypt...");
    const hashedPassword = await hashPassword(password);
    console.log("✅ Password berhasil di-hash.\n");

    // Buat User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            role: "admin",
            emailVerified: new Date(),
        },
    });

    // Buat Account (credential provider) — linked ke User
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
    console.log("─────────────────────────────────────────");
    console.log(`   Email    : ${email}`);
    console.log(`   Password : ${password}`);
    console.log(`   Nama     : ${name}`);
    console.log(`   Role     : admin`);
    console.log(`   User ID  : ${user.id}`);
    console.log("─────────────────────────────────────────");
    console.log("\n✅ Silakan login di http://localhost:3000");
}

main()
    .catch((e) => {
        console.error("❌ Error saat seeding:", e.message || e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
