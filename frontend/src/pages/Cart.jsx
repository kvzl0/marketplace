// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from '../CartContext';

const Cart = () => {
    const [cartItemsWithProducts, setCartItemsWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { cartItems, removeFromCart: contextRemove, clearCart: contextClear, updateQuantity: contextUpdate } = useCart();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    // ✅ Fetch product details (safe: no quantity overwrite)
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (cartItems.length === 0) {
                setCartItemsWithProducts([]);
                setLoading(false);
                return;
            }

            try {
                const detailedItems = await Promise.all(
                    cartItems.map(async (item) => {
                        try {
                            const res = await axios.get(`http://localhost:8800/products/${item.productId}`);
                            const productData = res.data;
                            // ✅ Exclude 'quantity' from product to avoid overwriting cart quantity
                            const safeProduct = {
                                id: productData.id,
                                prod_name: productData.prod_name,
                                prod_description: productData.prod_description,
                                image: productData.image,
                                price: productData.price,
                                category: productData.category
                            };
                            return { ...item, product: safeProduct };
                        } catch (err) {
                            console.warn(`Product ${item.productId} not found`);
                            return { ...item, product: null };
                        }
                    })
                );
                setCartItemsWithProducts(detailedItems.filter(item => item.product !== null));
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch product details:", err);
                setCartItemsWithProducts([]);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [cartItems]);

    // ❌ REMOVED DB sync useEffect — now handled in CartContext.js

    const total = cartItemsWithProducts.reduce((sum, item) => {
        return sum + (item.product?.price * item.quantity || 0);
    }, 0);

    const updateQuantity = (productId, newQty) => {
        if (newQty < 1) return;
        contextUpdate(productId, newQty);
    };

    const removeFromCart = (productId) => {
        contextRemove(productId);
    };

    const clearCart = () => {
        contextClear(); // 👈 Now clears DB via CartContext
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const createOrder = async () => {
            try {
                const items = cartItemsWithProducts.map(item => ({
                    product_id: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }));

                const orderData = {
                    user_id: userId,
                    total_amount: total,
                    shipping_address: user.address || "N/A",
                    status: "pending",
                    items
                };

                await axios.post("http://localhost:8800/orders", orderData);
                alert("Order placed successfully!");
                contextClear(); // Clears cart (and DB)
                navigate("/orders");
            } catch (err) {
                console.error("Checkout failed:", err);
                alert("Failed to place order. Please try again.");
            }
        };

        createOrder();
    };

    if (loading) {
        return (
            <div className="form" style={{ marginTop: '60px' }}>
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    return (
        <div className="form" style={{ marginTop: '105px', paddingTop: '20px', minHeight: '80vh', marginBottom: '40px' }}>
            <h2>Shopping Cart</h2>

            {cartItemsWithProducts.length === 0 ? (
                <div className="empty-state">
                    <h3>Your cart is empty</h3>
                    <p>Add some amazing PlusOne products!</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '30px' }}>
                        {cartItemsWithProducts.map((item) => (
                            <div key={item.productId} className="cart-item" style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '20px 0',
                                borderBottom: '1px solid var(--medium-gray)'
                            }}>
                                <div style={{ width: '100px', height: '100px', overflow: 'hidden', marginRight: '20px' }}>
                                    {item.product.image ? (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.prod_name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="shoe-no-image" style={{ width: '100%', height: '100%' }}>No Image</div>
                                    )}
                                </div>
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <h3>{item.product.prod_name}</h3>
                                    <p>₱{parseFloat(item.product.price).toLocaleString()}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <label>Qty:</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                                            style={{
                                                width: '60px',
                                                padding: '5px',
                                                border: '1px solid var(--medium-gray)',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            style={{
                                                background: 'var(--accent-red)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    ₱{(item.product.price * item.quantity).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '20px 0',
                        borderTop: '2px solid var(--medium-gray)',
                        marginTop: '20px'
                    }}>
                        <h3>Total: ₱{total.toLocaleString()}</h3>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={clearCart}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--primary-black)',
                                    border: '2px solid var(--primary-black)',
                                    padding: '12px 24px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={handleCheckout}
                                style={{
                                    background: 'var(--primary-black)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    cursor: 'pointer'
                                }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        style={{
                            marginTop: '20px',
                            background: 'transparent',
                            color: 'var(--primary-black)',
                            border: '2px solid var(--primary-black)',
                            padding: '12px 24px',
                            cursor: 'pointer'
                        }}
                    >
                        Continue Shopping
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;