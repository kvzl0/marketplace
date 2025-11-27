import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const res = await axios.get("http://localhost:8800/orders");
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllOrders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete("http://localhost:8800/orders/" + id);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return '#4caf50';
            case 'shipped':
                return '#2196f3';
            case 'processing':
                return '#ff9800';
            case 'pending':
                return '#9e9e9e';
            case 'cancelled':
                return '#f44336';
            default:
                return '#666';
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section hero-orders">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Order Management</h1>
                    <p className="hero-subtitle">Track and manage all customer orders</p>
                    <Link to="/orders/add" className="hero-cta">
                        <button className="hero-button">Create New Order</button>
                    </Link>
                </div>
            </section>

            {/* Orders Section */}
            <div className="products-section">
                <div className="section-header">
                    <h2>All Orders</h2>
                    <p>{orders.length} total orders</p>
                </div>

                <div className="shoes">
                    {orders.map((order) => (
                        <div className="shoe" key={order.id}>
                            <div className="shoe-info">
                                <h2>Order #{order.id}</h2>
                                <p><strong>Customer:</strong> {order.user_name}</p>
                                <p><strong>Email:</strong> {order.user_email}</p>
                                <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                                <p><strong>Address:</strong> {order.shipping_address}</p>

                                <div className="shoe-price">₱{parseFloat(order.total_amount).toLocaleString()}</div>

                                <div className="shoe-meta">
                                    <span style={{ 
                                        color: getStatusColor(order.status),
                                        fontWeight: 'bold'
                                    }}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>

                                <div className="shoe-actions">
                                    <button>
                                        <Link to={`/orders/view/${order.id}`}>View Details</Link>
                                    </button>
                                    <button className="update">
                                        <Link to={`/orders/update/${order.id}`}>Edit</Link>
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(order.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="empty-state">
                        <h3>No orders yet</h3>
                        <p>Start by creating your first order</p>
                        <Link to="/orders/add">
                            <button>Create Order</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;