// ===== Cart.jsx =====
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // Fetch full product details from backend
        const fetchCartDetails = async () => {
            try {
                const detailedItems = await Promise.all(
                    savedCart.map(async (item) => {
                        try {
                            const res = await axios.get(`http://localhost:8800/products/${item.productId}`);
                            return {
                                ...item,
                                product: res.data
                            };
                        } catch (err) {
                            console.warn(`Product ${item.productId} not found`);
                            return { ...item, product: null };
                        }
                    })
                );
                setCartItems(detailedItems.filter(item => item.product !== null));
                setLoading(false);
            } catch (err) {
                console.error("Failed to load cart:", err);
                setCartItems(savedCart.filter(item => item.product));
                setLoading(false);
            }
        };

        fetchCartDetails();
    }, []);

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
        return sum + (item.product?.price * item.quantity || 0);
    }, 0);

    // Update quantity
    const updateQuantity = (productId, newQty) => {
        if (newQty < 1) return;
        const updated = cartItems.map(item =>
            item.productId === productId ? { ...item, quantity: newQty } : item
        );
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // Remove item
    const removeFromCart = (productId) => {
        const updated = cartItems.filter(item => item.productId !== productId);
        setCartItems(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    // Handle checkout (placeholder)
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        alert("Checkout functionality will be implemented in the Orders module.");
        // Future: Redirect to /checkout or create order via API
    };

    if (loading) {
        return (
            <div className="form" style={{ marginTop: '60px' }}>
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    return (
        <div className="form" style={{ marginTop: '105px', paddingTop: '20px' , minHeight: '80vh', marginBottom: '40px' }}>
            <h2>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <h3>Your cart is empty</h3>
                    <p>Add some amazing PlusOne products!</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '30px' }}>
                        {cartItems.map((item) => (
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