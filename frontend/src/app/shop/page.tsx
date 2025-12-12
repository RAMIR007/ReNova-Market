import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/placeholder-data";
import { SlidersHorizontal } from "lucide-react";

export default async function ShopPage(props: {
    searchParams?: Promise<{
        category?: string;
        sort?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const categoryFilter = searchParams?.category;
    const sortOption = searchParams?.sort;

    let filteredProducts = [...PRODUCTS];

    // 1. Filter by Category
    if (categoryFilter) {
        if (categoryFilter === 'fashion') {
            filteredProducts = filteredProducts.filter(p => p.type === 'FASHION');
        } else if (categoryFilter === 'crafts') {
            filteredProducts = filteredProducts.filter(p => p.type === 'CRAFT');
        } else {
            // Loose string match for specific categories if we decide to pass them directly
            // For now, let's stick to the main types or specific distinct categories if needed
            // If the filter isn't one of the main types, try to match the category string
            filteredProducts = filteredProducts.filter(p =>
                p.category.toLowerCase().includes(categoryFilter.toLowerCase())
            );
        }
    }

    // 2. Sort
    if (sortOption === 'price_asc') {
        filteredProducts.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortOption === 'price_desc') {
        filteredProducts.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortOption === 'newest') {
        filteredProducts.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
    }

    // Get unique categories for sidebar
    const categories = Array.from(new Set(PRODUCTS.map(p => p.category))).sort();

    return (
        <div className="container mx-auto px-4 md:px-6 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-4">
                <div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Tienda</h1>
                    <p className="text-muted-foreground mt-2">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Simple Sort Links for now */}
                    <div className="text-sm text-muted-foreground">Ordered by:</div>
                    <div className="flex gap-2 text-sm">
                        <Link href={{ query: { ...searchParams, sort: 'newest' } }} className={`hover:text-primary ${sortOption === 'newest' || !sortOption ? 'font-bold text-foreground' : ''}`}>Lo Último</Link>
                        <Link href={{ query: { ...searchParams, sort: 'price_asc' } }} className={`hover:text-primary ${sortOption === 'price_asc' ? 'font-bold text-foreground' : ''}`}>Precio: Bajo a Alto</Link>
                        <Link href={{ query: { ...searchParams, sort: 'price_desc' } }} className={`hover:text-primary ${sortOption === 'price_desc' ? 'font-bold text-foreground' : ''}`}>Precio: Alto a Bajo</Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <aside className="hidden md:block space-y-8">
                    <div>
                        <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" /> Filtros
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-sm mb-2 text-foreground/80">Colecciones</h4>
                                <div className="flex flex-col gap-2 pl-2">
                                    <Link href="/shop" className={`text-sm hover:text-primary transition-colors ${!categoryFilter ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                                        Todo
                                    </Link>
                                    <Link href="/shop?category=fashion" className={`text-sm hover:text-primary transition-colors ${categoryFilter === 'fashion' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                                        Moda
                                    </Link>
                                    <Link href="/shop?category=crafts" className={`text-sm hover:text-primary transition-colors ${categoryFilter === 'crafts' ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                                        Artesanía
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm mb-2 text-foreground/80">Categorías</h4>
                                <div className="flex flex-col gap-2 pl-2">
                                    {categories.map(cat => (
                                        <Link
                                            key={cat}
                                            href={`/shop?category=${encodeURIComponent(cat)}`}
                                            className={`text-sm hover:text-primary transition-colors ${categoryFilter === cat ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center space-y-4 border rounded-lg border-dashed">
                            <p className="text-muted-foreground text-lg">No se encontraron productos en esta categoría.</p>
                            <Link href="/shop" className="text-primary hover:underline">Ver todos los productos</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
