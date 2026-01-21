"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { KhoaHoc } from '@/app/types';

type CartItem = KhoaHoc;

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (maKhoaHoc: string) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            if (prev.find((i) => i.maKhoaHoc === item.maKhoaHoc)) {
                return prev; // Item already in cart
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (maKhoaHoc: string) => {
        setCart((prev) => prev.filter((item) => item.maKhoaHoc !== maKhoaHoc));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Assuming price is fixed or derived. For now, let's assume a default price if not present.
    // In real app, price should be in KhoaHoc type.
    // Based on previous search, I saw "279.000 đ" hardcoded in CourseCard.
    // I'll add a temporary price calculation.
    const totalPrice = cart.reduce((total, item) => {
        return total + 279000; // Hardcoded for now as per UI
    }, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
