import { notFound } from "next/navigation";
import { PRODUCTS, Product as MockProduct } from "@/lib/placeholder-data";

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

// Helper to map Mock result to Frontend Product interface
function mapMockProduct(p: MockProduct): Product {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description || "",
        product_type: p.type,
        price_usd: p.priceUSD,
        image: p.image,
        stock: 10, // Mock stock
        is_featured: true, // Mock featured
        category: 0, // Mock ID
        category_name: p.category,
        condition: p.condition,
        origin: p.origin,
        created_at: new Date().toISOString(),
    };
}

// Products API
export async function getProducts(params?: URLSearchParams): Promise<PaginatedResponse<Product>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...PRODUCTS];

    if (params) {
        if (params.get('product_type')) {
            const type = params.get('product_type');
            filtered = filtered.filter(p => p.type === type);
        }
        // Ordering
        const ordering = params.get('ordering');
        if (ordering === 'price_usd') {
            filtered.sort((a, b) => a.priceUSD - b.priceUSD);
        } else if (ordering === '-price_usd') {
            filtered.sort((a, b) => b.priceUSD - a.priceUSD);
        }
    }

    const results = filtered.map(mapMockProduct);

    return {
        count: results.length,
        next: null,
        previous: null,
        results,
    };
}

export async function getProduct(slug: string): Promise<Product | null> {
    const p = PRODUCTS.find(p => p.slug === slug);
    if (!p) return null;
    return mapMockProduct(p);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    // Return random products or first 4
    return PRODUCTS.slice(0, 4).map(mapMockProduct);
}

export async function getConArteProducts(): Promise<Product[]> {
    const products = PRODUCTS.filter(p => p.type === 'CRAFT');
    return products.map(mapMockProduct);
}

