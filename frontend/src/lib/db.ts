// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//     return new PrismaClient()
// }

// declare global {
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const db = globalThis.prisma ?? prismaClientSingleton()

// export default db

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = db

// --- MOCK DB MODE (Due to Build/Environment Issues) ---
// This allows the Admin Panel and Frontend to be fully demonstrated and developed.
// Real database connection can be restored by uncommenting the lines above and fixing the workspace root/lockfile conflict.

const mockProducts = [
    { id: 1, name: "Camisa Vintage", slug: "camisa-vintage", price_usd: 25.00, product_type: "FASHION", is_active: true, stock: 5, category: { name: "Moda" } },
    { id: 2, name: "Jarrón Artesanal", slug: "jarron-artesanal", price_usd: 40.00, product_type: "CRAFT", is_active: true, stock: 2, category: { name: "Decoración" } },
];

const db: any = {
    product: {
        findMany: async () => mockProducts,
        count: async () => mockProducts.length,
        findUnique: async ({ where }: any) => mockProducts.find(p => p.id === where.id || p.slug === where.slug) || null,
        create: async () => ({ id: Date.now(), name: "Nuevo Producto" }),
        update: async () => ({ id: 1, name: "Producto Actualizado" }),
        delete: async () => ({ id: 1 }),
    },
    category: {
        findMany: async () => [{ id: 1, name: "Moda", slug: "moda", _count: { products: 12 } }, { id: 2, name: "Artesanía", slug: "artesania", _count: { products: 5 } }],
        findUnique: async () => ({ id: 1, name: "Moda" }),
        create: async () => ({ id: Date.now(), name: "Nueva Categoría" }),
        delete: async () => ({ id: 1 }),
    },
    user: {
        count: async () => 150,
        findMany: async () => [{ id: 1, email: "demo@user.com", first_name: "Demo", last_name: "User", date_joined: new Date(), is_staff: false }],
    },
    order: {
        count: async () => 25,
        aggregate: async () => ({ _sum: { total_amount: 1250.00 } }),
        findMany: async () => [{ id: 101, user: { email: "cliente@renova.com" }, created_at: new Date(), total_amount: 45.00 }],
    },
    $transaction: async (args: any[]) => args,
};

export default db;
