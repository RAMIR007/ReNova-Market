import Link from "next/link"
import { ProductCard } from "@/components/products/ProductCard"
import { ArrowRight } from "lucide-react"

// Mock Data for layout dev
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Vintage Linen Shirt",
    slug: "vintage-linen-shirt",
    priceUSD: 25.00,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1888&auto=format&fit=crop",
    category: "Men's Fashion",
    condition: "LIKE_NEW",
    type: 'FASHION' as const
  },
  {
    id: 2,
    name: "Handwoven Palm Basket",
    slug: "palm-basket",
    priceUSD: 15.00,
    image: "https://images.unsplash.com/photo-1616606004944-77db65367c2d?q=80&w=2696&auto=format&fit=crop",
    category: "Home Decor",
    origin: "San Francisco de Paula",
    type: 'CRAFT' as const
  },
  {
    id: 3,
    name: "Leather Satchel Bag",
    slug: "leather-satchel",
    priceUSD: 45.00,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2669&auto=format&fit=crop",
    category: "Accessories",
    condition: "GOOD",
    type: 'FASHION' as const
  },
  {
    id: 4,
    name: "Ceramic Vase 'Havana'",
    slug: "ceramic-vase",
    priceUSD: 30.00,
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=2670&auto=format&fit=crop",
    category: "Artisan Crafts",
    origin: "Local Artisan",
    type: 'CRAFT' as const
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0 opacity-60">
          {/* Ideally a video or high-res image of Havana/Fashion */}
          <img
            src="https://images.unsplash.com/photo-1500057630393-27c598d1a120?q=80&w=2621&auto=format&fit=crop"
            alt="Havana Vibes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">
            ReNova <span className="text-primary-foreground italic font-light">Market</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200/90 font-light max-w-xl mx-auto">
            Authentic Cuban heritage meets exclusive sustainable fashion.
            Curated in San Francisco de Paula.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/shop?category=fashion"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Shop Fashion
            </Link>
            <Link
              href="/shop?category=crafts"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-input bg-background/10 backdrop-blur-sm px-8 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Discover Crafts
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Curated for the Conscious</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            At ReNova, we believe in the beauty of the second life. We bring you premium fashion pieces sourced with care,
            alongside the raw, authentic beauty of Cuban craftsmanship. Every piece tells a story of renewal and identity.
          </p>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold">New Arrivals</h2>
            <Link href="/shop" className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
              View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
