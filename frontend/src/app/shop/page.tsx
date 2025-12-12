import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function ShopPage(props: {
    searchParams?: Promise<{
        category?: string;
        product_type?: string;
        ordering?: string; // API uses price_usd or -price_usd
    }>;
}) {
    const searchParams = await props.searchParams;
    const categoryFilter = searchParams?.category;
    const typeFilter = searchParams?.product_type;
    const sortOption = searchParams?.ordering;

    // Build params for API
    const apiParams = new URLSearchParams();
    if (categoryFilter) {
        if (categoryFilter === 'fashion') apiParams.set('product_type', 'FASHION');
        else if (categoryFilter === 'crafts') apiParams.set('product_type', 'CRAFT');
        // Note: If we had a real category slug filter in backend we'd use it. 
        // Currently backend filters by ID or product_type. 
        // Assuming filters work basic for now.
    }
    if (typeFilter) apiParams.set('product_type', typeFilter);
    if (sortOption) apiParams.set('ordering', sortOption);

    const data = await getProducts(apiParams);
    const products = data.results;

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-stone-900 py-12 px-4 md:px-6">
                <div className="container mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Tienda</h1>
                    <p className="text-stone-300 max-w-2xl">
                        Explora nuestra colección curada de moda sostenible y artesanía auténtica.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-8 flex-shrink-0 hidden lg:block">
                        <div>
                            <h3 className="font-bold mb-4 font-serif text-lg">Colecciones</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/shop" className="hover:text-primary transition-colors">Todo</Link>
                                </li>
                                <li>
                                    <Link href="/shop?category=fashion" className="hover:text-primary transition-colors">Moda Sostenible</Link>
                                </li>
                                <li>
                                    <Link href="/shop?category=crafts" className="hover:text-primary transition-colors">Artesanía Local</Link>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Mobile Filter Bar & Sort */}
                        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                            <p className="text-sm text-muted-foreground">
                                Mostrando {products.length} resultados
                            </p>

                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown simulated with links for now */}
                                <div className="flex gap-2 text-sm">
                                    <span className="text-muted-foreground">Ordenar por:</span>
                                    <Link href="/shop?ordering=-created_at" className="hover:text-foreground">Lo Último</Link>
                                    <Link href="/shop?ordering=price_usd" className="hover:text-foreground">Precio: Bajo a Alto</Link>
                                    <Link href="/shop?ordering=-price_usd" className="hover:text-foreground">Precio: Alto a Bajo</Link>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="py-20 text-center text-muted-foreground">
                                <p className="text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
                                <Link href="/shop" className="text-primary hover:underline mt-2 inline-block">Limpiar filtros</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
