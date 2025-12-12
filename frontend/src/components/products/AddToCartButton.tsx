"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/api";
import { ShoppingBag, Check } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        addItem(product);
        setIsAdded(true);
        // Reset "Added" state after 2 seconds
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full h-12 font-medium rounded-md transition-all flex items-center justify-center gap-2 ${isAdded
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
        >
            {isAdded ? (
                <>
                    <Check className="h-5 w-5" />
                    Añadido
                </>
            ) : (
                <>
                    <ShoppingBag className="h-5 w-5" />
                    Añadir al Carrito
                </>
            )}
        </button>
    );
}
