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
    const userRole = user?.role;

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
                                quantity: productData.quantity // ✅ Now safe to include for stock display
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
        contextClear();
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
                contextClear();
                navigate("/orders");
            } catch (err) {
                console.error("Checkout failed:", err);
                alert("Failed to place order. Please try again.");
            }
        };

        createOrder();
    };

    // 💡 Get current date + 2 days for estimated delivery
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
                                        {/* ✅ Product Description */}
                                        <p className="item-description">
                                            {item.product.prod_description}
                                        </p>
                                        <p className="item-price">₱{parseFloat(item.product.price).toLocaleString()}</p>
                                        
                                        {/* ✅ Stock Indicator (Admin Only) */}
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
                        
                        {/* ✅ Discount Code Field */}
                        <div className="discount-section">
                            <input 
                                type="text" 
                                placeholder="Enter discount code" 
                                className="discount-input"
                            />
                            <button className="apply-btn">Apply</button>
                        </div>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal ({cartItemsWithProducts.length} items)</span>
                                <span>₱{total.toLocaleString()}</span>
                            </div>
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