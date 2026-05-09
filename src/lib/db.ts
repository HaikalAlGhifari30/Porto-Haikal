import { PrismaClient } from "@prisma/client"

// Standard Prisma Client initialization
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = (globalForPrisma.prisma && (globalForPrisma.prisma as any).heroSlide) 
    ? globalForPrisma.prisma 
    : new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
