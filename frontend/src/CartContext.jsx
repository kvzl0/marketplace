// src/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// ✅ Safe helper to get current user from localStorage
const getCurrentUser = () => {
    try {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) return null;
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;
        const user = JSON.parse(userStr);
        return user && user.id ? user : null;
    } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        return null;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // ✅ Sync cart to DB — now robust and logged
    const syncCartToDB = async (items) => {
        const user = getCurrentUser();
        const userId = user?.id;

        if (!userId) {
            console.log("Cart sync skipped: no logged-in user");
            return;
        }

        console.log("Syncing cart to DB for user:", userId, "Items:", items);
        try {
            await axios.delete(`http://localhost:8800/cart/clear/${userId}`);
            if (items.length > 0) {
                for (const item of items) {
                    await axios.post("http://localhost:8800/cart", {
                        userId,
                        productId: item.productId,
                        quantity: item.quantity
                    });
                }
            }
            console.log("Cart synced to DB successfully");
        } catch (err) {
            console.error("Failed to sync cart to DB:", err);
        }
    };

    // Load cart on app start
    useEffect(() => {
        const loadCart = async () => {
            const user = getCurrentUser();
            const userId = user?.id;

            if (userId) {
                try {
                    const res = await axios.get(`http://localhost:8800/cart?userId=${userId}`);
                    const dbCart = res.data.map(row => ({
                        productId: row.product_id,
                        quantity: row.quantity
                    }));
                    setCartItems(dbCart);
                    localStorage.setItem('cart', JSON.stringify(dbCart));
                    return;
                } catch (err) {
                    console.warn("Failed to load cart from DB, using localStorage");
                }
            }
            // Fallback to localStorage
            try {
                const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(savedCart);
            } catch (e) {
                setCartItems([]);
            }
        };

        loadCart();
    }, []);

    // Sync to DB + localStorage on every cart change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        syncCartToDB(cartItems);
    }, [cartItems]);

    const addToCart = (productId, quantity = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) {
                return prev.map(item =>
                    item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { productId, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        console.log("Clearing cart...");
        setCartItems([]);
    };

    const updateQuantity = (productId, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId ? { ...item, quantity: newQty } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);