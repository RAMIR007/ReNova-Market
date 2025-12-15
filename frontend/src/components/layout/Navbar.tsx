"use client";

import * as React from "react"
import Link from "next/link"
import { ShoppingBag, Search, Menu, User, X } from "lucide-react"
import { useCart } from "@/lib/cart-context";

export function Navbar() {
    const { itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/shop", label: "Tienda" },
        { href: "/conarte", label: "ConArte", className: "text-amber-600 font-serif font-semibold" },
        { href: "/stories", label: "Historias" },
        { href: "/about", label: "Nosotros" },
    ];

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
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors hover:text-primary ${link.className || ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
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

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-muted-foreground hover:text-primary transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-base font-medium transition-colors hover:text-primary ${link.className || ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
