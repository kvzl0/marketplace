// src/pages/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from '../CartContext';

const Cart = () => {
    const [cartItemsWithProducts, setCartItemsWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shippingAddress, setShippingAddress] = useState(""); // ✅ New state
    const [discountCode, setDiscountCode] = useState(""); // ✅ New state
    const [discount, setDiscount] = useState(0); // ✅ Discount amount
    const navigate = useNavigate();

    const { cartItems, removeFromCart: contextRemove, clearCart: contextClear, updateQuantity: contextUpdate } = useCart();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    const userRole = user?.role;

    // Auto-fill address from user profile
    useEffect(() => {
        if (user?.address) {
            setShippingAddress(user.address);
        }
    }, [user]);

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
                            const safeProduct = {
                                id: productData.id,
                                prod_name: productData.prod_name,
                                prod_description: productData.prod_description,
                                image: productData.image,
                                price: productData.price,
                                category: productData.category,
                                quantity: productData.quantity
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

    // Subtotal (before discount)
    const subtotal = cartItemsWithProducts.reduce((sum, item) => {
        return sum + (item.product?.price * item.quantity || 0);
    }, 0);

    // Total = subtotal - discount
    const total = Math.max(0, subtotal - discount);

    const updateQuantity = (productId, newQty) => {
        if (newQty < 1) return;
        contextUpdate(productId, newQty);
    };

    const removeFromCart = (productId) => {
        contextRemove(productId);
    };

    const clearCart = () => {
        contextClear();
        setDiscount(0);
        setDiscountCode("");
    };

    // ✅ Apply hardcoded discount code
    const applyDiscount = () => {
        const code = discountCode.trim().toUpperCase();
        if (code === "PLUSONE10") {
            const discountAmount = subtotal * 0.10; // 10% off
            setDiscount(discountAmount);
            alert("10% discount applied!");
        } else {
            alert("Invalid discount code. Try: PLUSONE10");
            setDiscount(0);
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }
        if (!shippingAddress.trim()) {
            alert("Please enter a shipping address.");
            return;
        }

        try {
            const items = cartItemsWithProducts.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
                price: item.product.price
            }));

            const orderData = {
                user_id: userId,
                total_amount: total, // ✅ Uses discounted total
                shipping_address: shippingAddress, // ✅ Uses user input
                status: "pending",
                items
            };

            const response = await axios.post("http://localhost:8800/orders", orderData);
            alert("Order placed successfully!");
            contextClear();
            setDiscount(0);
            setDiscountCode("");
            navigate("/orders");
        } catch (err) {
            console.error("Checkout failed:", err);
            const errorMsg = err.response?.data?.error || "Failed to place order. Please try again.";
            
            if (err.response?.data?.details) {
                const details = err.response.data.details;
                const messages = details.map(d => 
                    `There are only ${d.available} stock(s) available`
                ).join("\n");
                alert(`Insufficient stock:\n${messages}`);
            } else {
                alert(errorMsg);
            }
        }
    };

    const getEstimatedDelivery = () => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2);
        return deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="form" style={{ marginTop: '60px' }}>
                <h2>Loading your cart...</h2>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-items-section">
                    <h2>Shopping Cart</h2>

                    {cartItemsWithProducts.length === 0 ? (
                        <div className="empty-cart">
                            <h3>Your cart is empty</h3>
                            <p>Add some amazing PlusOne products!</p>
                            <button className="continue-shopping-btn" onClick={() => navigate("/")}>Continue Shopping</button>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItemsWithProducts.map((item) => (
                                <div key={item.productId} className="cart-item">
                                    <div className="item-image">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.prod_name}
                                            />
                                        ) : (
                                            <div className="no-image">No Image</div>
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <h3>
                                            {item.product.prod_name}
                                            <span className="category-badge">{item.product.category}</span>
                                        </h3>
                                        <p className="item-description">
                                            {item.product.prod_description}
                                        </p>
                                        <p className="item-price">₱{parseFloat(item.product.price).toLocaleString()}</p>
                                        
                                        {userRole === "admin" && (
                                            <div className={`stock-indicator ${
                                                item.product.quantity <= 5 ? 'stock-low' : 
                                                item.product.quantity <= 10 ? 'stock-medium' : 'stock-high'
                                            }`}>
                                                Stock: {item.product.quantity}
                                            </div>
                                        )}

                                        <div className="quantity-controls">
                                            <label>Qty:</label>
                                            <div className="quantity-selector">
                                                <button 
                                                    className="quantity-btn minus-btn"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity-display">{item.quantity}</span>
                                                <button 
                                                    className="quantity-btn plus-btn"
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromCart(item.productId)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        ₱{(item.product.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItemsWithProducts.length > 0 && (
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        
                        {/* ✅ Shipping Address Input */}
                        <div className="shipping-section" style={{ marginBottom: '20px' }}>
                            <label htmlFor="shippingAddress" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Shipping Address
                            </label>
                            <textarea
                                id="shippingAddress"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                placeholder="Street Address, City, Postal Code"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    minHeight: '60px'
                                }}
                                required
                            />
                        </div>

                        {/* ✅ Discount Code Field */}
                        <div className="discount-section">
                            <input 
                                type="text" 
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="Enter discount code (e.g., PLUSONE10)" 
                                className="discount-input"
                            />
                            <button className="apply-btn" onClick={applyDiscount}>
                                Apply
                            </button>
                        </div>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal ({cartItemsWithProducts.length} items)</span>
                                <span>₱{subtotal.toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row">
                                    <span>Discount (10%)</span>
                                    <span>-₱{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row">
                                <span>Estimated Delivery</span>
                                <span>{getEstimatedDelivery()}</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>₱{total.toLocaleString()}</span>
                            </div>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                        <button className="clear-cart-btn" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;