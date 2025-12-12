import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Types matching Django Serializer
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
    condition?: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR'; // Verify exact strings in models if needed
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

// Fetch helper
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        // Ensure we don't cache aggressively during dev
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}

// Products API
export async function getProducts(params?: URLSearchParams): Promise<PaginatedResponse<Product>> {
    const queryString = params ? `?${params.toString()}` : "";
    return fetchAPI<PaginatedResponse<Product>>(`products/${queryString}`);
}

export async function getProduct(slug: string): Promise<Product | null> {
    try {
        return await fetchAPI<Product>(`products/${slug}/`);
    } catch (error) {
        console.error(`Failed to fetch product ${slug}`, error);
        return null;
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const data = await getProducts(new URLSearchParams({ is_featured: "true" }));
    return data.results.slice(0, 4); // Limit to 4 for the home page
}

export async function getConArteProducts(): Promise<Product[]> {
    const data = await getProducts(new URLSearchParams({ product_type: "CRAFT" }));
    return data.results;
}

// Helper to map backend product to the shape used by frontend components if needed
// Or we can just update components to use the new shape.
// Current shape in placeholder-data: priceUSD, type, condition...
// New shape: price_usd, product_type, condition...
// I will update components to match the API response directly.
