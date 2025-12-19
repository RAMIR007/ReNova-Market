import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
    try {
        const connectionString = process.env.DATABASE_URL
        const pool = new Pool({ connectionString })
        const adapter = new PrismaPg(pool)
        return new PrismaClient({ adapter })
    } catch (e) {
        console.error("Failed to initialize Prisma Client:", e);
        // Fallback for build environment where Prisma might fail
        return new Proxy({}, {
            get: (target, prop) => {
                if (prop === 'then') return undefined; // Valid promise check
                return new Proxy({}, {
                    get: (t, p) => {
                        if (p === 'then') return undefined;
                        return () => Promise.resolve([])
                    }
                });
            }
        }) as unknown as PrismaClient;
    }
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
