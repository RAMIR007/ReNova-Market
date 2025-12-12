"use client";

import Link from "next/link"
import { ShoppingBag, Search, Menu, User } from "lucide-react"
import { useCart } from "@/lib/cart-context";

export function Navbar() {
    const { itemCount } = useCart();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                        <span className="font-serif text-lg font-bold text-primary">R</span>
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight text-foreground">
                        ReNova<span className="text-primary">Market</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
                    <Link href="/shop" className="transition-colors hover:text-primary">Tienda</Link>
                    <Link href="/conarte" className="transition-colors hover:text-amber-600 font-serif font-semibold text-amber-700">ConArte</Link>
                    <Link href="/stories" className="transition-colors hover:text-primary">Historias</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">Nosotros</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                        <Search className="h-5 w-5" />
                    </button>

                    <Link href="/cart" className="relative text-muted-foreground hover:text-primary transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    <button className="text-muted-foreground hover:text-primary transition-colors">
                        <User className="h-5 w-5" />
                    </button>

                    <button className="md:hidden text-muted-foreground hover:text-primary transition-colors">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    )
}
