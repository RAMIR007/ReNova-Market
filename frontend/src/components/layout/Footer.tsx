import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border bg-card text-card-foreground">
            <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary">
                                <span className="font-serif text-lg font-bold text-primary">R</span>
                            </div>
                            <span className="font-serif text-xl font-bold tracking-tight">ReNovaMarket</span>
                        </Link>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Connecting Cuban heritage with modern sustainable fashion. Located in the heart of San Francisco de Paula.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Shop</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop?category=fashion" className="hover:text-primary transition-colors">Premium Second Hand</Link></li>
                            <li><Link href="/shop?category=crafts" className="hover:text-primary transition-colors">Local Crafts</Link></li>
                            <li><Link href="/shop/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="/sales" className="hover:text-primary transition-colors">Sales</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Support</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Visit Us</h3>
                        <address className="not-italic text-sm text-muted-foreground mb-4">
                            San Francisco de Paula,<br />
                            San Miguel del Padrón,<br />
                            La Habana, Cuba
                        </address>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
                    <p>&copy; {new Date().getFullYear()} ReNova Market. All rights reserved.</p>
                    <div className="mt-4 flex gap-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
