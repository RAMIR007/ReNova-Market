import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/placeholder-data";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck } from "lucide-react";

export default async function ProductPage(props: {
    params: Promise<{ slug: string }>;
}) {
    const params = await props.params;
    const product = PRODUCTS.find((p) => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    const isCraft = product.type === "CRAFT";

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Volver a la Tienda
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image */}
                <div className="space-y-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary border border-border">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {isCraft && (
                            <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1.5 rounded-md shadow-lg font-serif italic text-sm">
                                Vendido por: ConArte Boutique
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                        * Las imágenes son referenciales. Cada pieza es única.
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col space-y-8">
                    <div>
                        {isCraft ? (
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wider mb-3">
                                ARTESANÍA CUBANA
                            </span>
                        ) : (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider mb-3">
                                MODA SOSTENIBLE
                            </span>
                        )}

                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-2">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <span>{product.category}</span>
                            {product.condition && (
                                <>
                                    <span>•</span>
                                    <span>{product.condition === 'LIKE_NEW' ? 'Como Nuevo' : product.condition === 'GOOD' ? 'Bueno' : product.condition}</span>
                                </>
                            )}
                            {product.origin && (
                                <>
                                    <span>•</span>
                                    <span>{product.origin}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-foreground">
                        ${product.priceUSD.toFixed(2)}
                    </div>

                    <div className="prose prose-stone text-muted-foreground">
                        <p>{product.description || "Sin descripción disponible para este producto."}</p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border">
                        <button className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Añadir al Carrito
                        </button>
                        <p className="text-xs text-center text-muted-foreground">
                            {isCraft ? "Envío directo desde el taller del artesano." : "Inspeccionado y verificado por ReNova Market."}
                        </p>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h4 className="font-medium text-sm">Envío Local</h4>
                                <p className="text-xs text-muted-foreground">Disponible para toda La Habana.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h4 className="font-medium text-sm">Calidad Garantizada</h4>
                                <p className="text-xs text-muted-foreground">Verificamos cada artículo.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
