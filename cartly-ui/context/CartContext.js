"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }

        try {
            const response = await fetch("/api/cartStatus");
            if (response.ok) {
                const allItems = await response.json();
                // Filter for current user
                const userItems = allItems.filter(item => item.userId === (user.id || user.userId));
                setCartCount(userItems.length);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, refreshCart: fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
