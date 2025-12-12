"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { items, removeItem, cartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="font-serif text-3xl font-bold mb-4">Tu carrito está vacío</h1>
                <p className="text-muted-foreground mb-8">Parece que aún no has encontrado tu tesoro único.</p>
                <Link
                    href="/shop"
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Ir a la Tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Tu Carrito ({items.length})</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.cartId} className="flex gap-4 p-4 border border-border rounded-lg bg-card group">
                            <div className="relative w-24 h-24 flex-shrink-0 bg-secondary rounded-md overflow-hidden">
                                <Image
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-foreground">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">{item.category_name}</p>
                                    </div>
                                    <p className="font-bold">${item.price_usd.toFixed(2)}</p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => removeItem(item.cartId)}
                                        className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" /> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={clearCart}
                        className="text-sm text-muted-foreground hover:text-foreground underline"
                    >
                        Vaciar Carrito
                    </button>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-secondary/30 p-6 rounded-lg border border-border sticky top-24">
                        <h2 className="font-serif text-xl font-bold mb-6">Resumen del Pedido</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Envío</span>
                                <span className="text-green-600 font-medium">Gratis (La Habana)</span>
                            </div>
                            <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)} USD</span>
                            </div>
                        </div>

                        <button className="w-full h-12 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-4">
                            Proceder al Pago <ArrowRight className="h-4 w-4" />
                        </button>

                        <p className="text-xs text-center text-muted-foreground">
                            Al proceder, aceptas nuestros términos y condiciones.
                            Pago contra entrega o transferencia local disponible.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
