"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/api";

type CartItem = Product & {
    cartId: string;
};

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (cartId: string) => void;
    clearCart: () => void;
    itemCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem("renova_cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("renova_cart", JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addItem = (product: Product) => {
        const newItem: CartItem = { ...product, cartId: crypto.randomUUID() };
        setItems((prev) => [...prev, newItem]);
    };

    const removeItem = (cartId: string) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemCount = items.length;
    // Updated to use price_usd
    const cartTotal = items.reduce((total, item) => total + (item.price_usd || 0), 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, clearCart, itemCount, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
