import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/placeholder-data";

export default function ConArtePage() {
    const craftProducts = PRODUCTS.filter((p) => p.type === "CRAFT");

    return (
        <div className="min-h-screen bg-stone-950 text-amber-50">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
                {/* Background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-stone-950 to-stone-950 pointer-events-none" />

                <div className="relative z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-amber-600/30 p-2 shadow-2xl shadow-amber-900/20 bg-stone-900/50 backdrop-blur-sm">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image
                                src="/conarte-logo.jpg"
                                alt="ConArte Boutique Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 pb-2">
                            ConArte Boutique
                        </h1>
                        <p className="text-lg md:text-xl text-amber-100/80 font-light italic max-w-xl mx-auto">
                            "Donde la tradición se encuentra con la elegancia."
                        </p>
                        <p className="text-stone-400 max-w-2xl mx-auto leading-relaxed">
                            Bienvenido a nuestro catálogo exclusivo. Cada pieza es una obra maestra única, creada a mano con pasión y materiales auténticos.
                            Descubre la belleza de la artesanía cubana elevada a su máxima expresión.
                        </p>
                    </div>
                </div>
            </section>

            {/* Collection Grid */}
            <section className="py-16 md:py-24 bg-stone-950 border-t border-amber-900/20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="font-serif text-3xl text-amber-500">Nuestra Colección</h2>
                        <span className="text-stone-500 text-sm">{craftProducts.length} Piezas Únicas</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {craftProducts.map((product) => (
                            <div key={product.id} className="group">
                                {/* Wrapping standard card but could customize heavily here if needed. 
                        Using ProductCard but passing specific styling could be constrained, 
                        so wrapping it to ensure dark mode context works well if card is transparent.
                        Currently Card has some hardcoded colors, so it might stand out. 
                        Let's verify visual result. */}
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>

                    {craftProducts.length === 0 && (
                        <div className="text-center py-20 text-stone-600">
                            <p>No hay piezas disponibles en este momento. Vuelve pronto.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-12 bg-amber-950/10 border-t border-amber-900/20 text-center text-amber-800/60 text-sm">
                <p>Una colaboración exclusiva con ReNova Market.</p>
            </section>
        </div>
    );
}
