import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Leaf, Recycle, Heart } from "lucide-react";
import { getFeaturedProducts } from "@/lib/api";

export const dynamic = 'force-dynamic'; // Ensures we don't build-time cache the API calls unnecessarily during dev

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1500057630393-27c598d1a120?q=80&w=2621&auto=format&fit=crop"
            alt="Vibras de La Habana"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Renueva tu Estilo,<br />
            <span className="text-primary italic">Revive la Historia.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200/90 font-light max-w-xl mx-auto mb-8">
            Herencia cubana auténtica y moda sostenible exclusiva.
            Curado en San Francisco de Paula.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop?category=fashion"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Comprar Moda
            </Link>
            <Link
              href="/conarte"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-input bg-background/10 backdrop-blur-sm px-8 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Descubrir Artesanía
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl font-bold">Nuevas Llegadas</h2>
            <Link href="/shop" className="group flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Ver Todo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {featuredProducts.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                <p>No hay productos destacados en este momento.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Curado para el Consciente</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                En ReNova, creemos en la belleza de la segunda vida. Te traemos piezas de moda premium seleccionadas con cuidado,
                junto con la belleza cruda y auténtica de la artesanía cubana. Cada pieza cuenta una historia de renovación e identidad.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-primary" />
                  <span className="font-medium text-stone-700">Sostenibilidad Primero</span>
                </div>
                <div className="flex items-center gap-3">
                  <Recycle className="h-5 w-5 text-primary" />
                  <span className="font-medium text-stone-700">Economía Circular</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-amber-600" />
                  <span className="font-medium text-stone-700">Apoyo a Artesanos Locales</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] bg-stone-200 rounded-lg overflow-hidden shadow-xl">
              {/* Decorative image */}
              <img
                src="https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1000&auto=format&fit=crop"
                alt="Philosophy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
