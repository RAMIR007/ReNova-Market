import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Product } from "@/lib/api"
import { AddToCartButton } from "./AddToCartButton"

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({
    product,
    className,
}: ProductCardProps) {
    const {
        name,
        slug,
        price_usd,
        image,
        category_name,
        condition,
        origin,
        product_type
    } = product;

    return (
        <div className={cn("group relative flex flex-col overflow-hidden rounded-md border border-transparent transition-all hover:border-border hover:shadow-sm bg-card", className)}>
            {/* Image Container */}
            <div className="aspect-[3/4] overflow-hidden bg-secondary relative">
                <Image
                    src={image || "/placeholder.jpg"}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {condition && (
                    <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-semibold backdrop-blur-sm rounded">
                        {condition === 'LIKE_NEW' ? 'COMO NUEVO' : condition === 'GOOD' ? 'BUENO' : condition === 'FAIR' ? 'REGULAR' : condition}
                    </span>
                )}
                {product_type === 'CRAFT' && (
                    <div className="absolute top-2 left-2 flex flex-col items-start gap-1">
                        {origin && (
                            <span className="bg-primary/90 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-semibold backdrop-blur-sm rounded">
                                {origin}
                            </span>
                        )}
                        <span className="bg-amber-600/90 text-white text-[10px] px-2 py-1 uppercase tracking-wider font-semibold backdrop-blur-sm rounded shadow-sm">
                            ConArte Boutique
                        </span>
                    </div>
                )}

                {/* Quick Add Button (Optional, can be added later) */}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4 space-y-2">
                <h3 className="font-serif text-lg font-medium text-foreground line-clamp-1">
                    <Link href={`/product/${slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {name}
                    </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{category_name}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                    <p className="text-lg font-bold text-foreground">
                        ${price_usd.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    )
}
