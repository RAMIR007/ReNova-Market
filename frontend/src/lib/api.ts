import { notFound } from "next/navigation";
import db from "@/lib/db";
import { Product as PrismaProduct, Category, ProductType, Condition } from "@prisma/client";

// Types matching Frontend components
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    product_type: 'FASHION' | 'CRAFT';
    price_usd: number;
    price_cup?: number;
    image: string | null;
    stock: number;
    is_featured: boolean;
    category: number;
    category_name: string;
    // Details
    size?: string;
    brand?: string;
    condition?: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR';
    material?: string;
    origin?: string;
    created_at: string;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// Helper to map Prisma result to Frontend Product interface
function mapPrismaProduct(p: PrismaProduct & { category: Category | null }): Product {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        product_type: p.product_type as 'FASHION' | 'CRAFT',
        price_usd: p.price_usd.toNumber(),
        image: p.image,
        stock: p.stock,
        is_featured: p.is_featured,
        category: p.category_id || 0,
        category_name: p.category?.name || "Sin Categoría",
        size: p.size || undefined,
        brand: p.brand || undefined,
        condition: (p.condition as 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR') || undefined,
        material: p.material || undefined,
        origin: p.origin || undefined,
        created_at: p.created_at.toISOString(),
    };
}

// Products API
export async function getProducts(params?: URLSearchParams): Promise<PaginatedResponse<Product>> {
    try {
        const where: any = { is_active: true };

        if (params) {
            if (params.get('product_type')) {
                where.product_type = params.get('product_type') as ProductType;
            }
            if (params.get('is_featured') === 'true') {
                where.is_featured = true;
            }
        }

        const orderBy: any = {};
        if (params?.get('ordering')) {
            const ordering = params.get('ordering')!;
            if (ordering === 'price_usd') orderBy.price_usd = 'asc';
            if (ordering === '-price_usd') orderBy.price_usd = 'desc';
            if (ordering === '-created_at') orderBy.created_at = 'desc';
        } else {
            orderBy.created_at = 'desc';
        }

        const [prismaProducts, total] = await db.$transaction([
            db.product.findMany({
                where,
                orderBy,
                include: { category: true },
            }),
            db.product.count({ where }),
        ]);

        const results = prismaProducts.map(mapPrismaProduct);

        return {
            count: total,
            next: null,
            previous: null,
            results,
        };
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { count: 0, next: null, previous: null, results: [] };
    }
}

export async function getProduct(slug: string): Promise<Product | null> {
    try {
        const p = await db.product.findUnique({
            where: { slug },
            include: { category: true },
        });

        if (!p) return null;
        return mapPrismaProduct(p);
    } catch (error) {
        console.error(`Failed to fetch product ${slug}:`, error);
        return null;
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const products = await db.product.findMany({
            where: { is_active: true, is_featured: true },
            take: 4,
            orderBy: { created_at: 'desc' },
            include: { category: true },
        });
        return products.map(mapPrismaProduct);
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}

export async function getConArteProducts(): Promise<Product[]> {
    try {
        const products = await db.product.findMany({
            where: { is_active: true, product_type: 'CRAFT' },
            orderBy: { created_at: 'desc' },
            include: { category: true },
        });
        return products.map(mapPrismaProduct);
    } catch (error) {
        console.error("Failed to fetch ConArte products:", error);
        return [];
    }
}

