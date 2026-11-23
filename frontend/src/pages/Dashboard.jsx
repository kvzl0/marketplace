// ===== Dashboard.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: [],
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    // 🔒 Redirect if not admin
    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole !== "admin") {
            alert("Access denied. Admins only.");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [productsRes, usersRes, ordersRes] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/products`),
                    axios.get(`${process.env.REACT_APP_API_URL}/users`),
                    axios.get(`${process.env.REACT_APP_API_URL}/orders`)
                ]);

                const products = productsRes.data;
                const users = usersRes.data;
                const orders = ordersRes.data;

                const totalRevenue = orders.reduce((sum, order) => 
                    sum + parseFloat(order.total_amount), 0
                );

                const lowStockProducts = products.filter(p => p.quantity < 10);
                const recentOrders = orders.slice(0, 5);

                setStats({
                    totalProducts: products.length,
                    totalUsers: users.length,
                    totalOrders: orders.length,
                    totalRevenue: totalRevenue,
                    lowStockProducts: lowStockProducts,
                    recentOrders: recentOrders
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    return (
        <div>
            {/* Dashboard Content */}
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Overview of your marketplace</p>
                </div>
                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card stat-products">
                        <div className="stat-icon">📦</div>
                        <div className="stat-info">
                            <h3>{stats.totalProducts}</h3>
                            <p>Total Products</p>
                        </div>
                        <Link to="/products" className="stat-link">View Products →</Link>
                    </div>

                    <div className="stat-card stat-users">
                        <div className="stat-icon">👥</div>
                        <div className="stat-info">
                            <h3>{stats.totalUsers}</h3>
                            <p>Registered Users</p>
                        </div>
                        <Link to="/users" className="stat-link">View Users →</Link>
                    </div>

                    <div className="stat-card stat-orders">
                        <div className="stat-icon">📋</div>
                        <div className="stat-info">
                            <h3>{stats.totalOrders}</h3>
                            <p>Total Orders</p>
                        </div>
                        <Link to="/orders" className="stat-link">View Orders →</Link>
                    </div>

                    <div className="stat-card stat-revenue">
                        <div className="stat-icon">💰</div>
                        <div className="stat-info">
                            <h3>₱{stats.totalRevenue.toLocaleString()}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                </div>

                {/* Low Stock Alert */}
                {stats.lowStockProducts.length > 0 && (
                    <div className="dashboard-section">
                        <h2>⚠️ Low Stock Alert</h2>
                        <p className="section-subtitle">Products with less than 10 items in stock</p>
                        <div className="low-stock-list">
                            {stats.lowStockProducts.map((product) => (
                                <div className="low-stock-item" key={product.id}>
                                    <div className="low-stock-info">
                                        <h4>{product.prod_name}</h4>
                                        <span className="stock-warning">Only {product.quantity} left</span>
                                    </div>
                                    <Link to={`/products/update/${product.id}`}>
                                        <button className="restock-btn">Restock</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Orders */}
                <div className="dashboard-section">
                    <h2>📦 Recent Orders</h2>
                    <p className="section-subtitle">Latest customer orders</p>
                    {stats.recentOrders.length > 0 ? (
                        <div className="recent-orders-list">
                            {stats.recentOrders.map((order) => (
                                <div className="order-item" key={order.id}>
                                    <div className="order-info">
                                        <h4>Order #{order.id}</h4>
                                        <p>{order.user_name} - {order.user_email}</p>
                                        <span className={`order-status status-${order.status}`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="order-amount">
                                        <h3>₱{parseFloat(order.total_amount).toLocaleString()}</h3>
                                        <p>{new Date(order.order_date).toLocaleDateString()}</p>
                                    </div>
                                    <Link to={`/orders/view/${order.id}`}>
                                        <button className="view-btn">View</button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-orders">No orders yet</p>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="dashboard-section">
                    <h2>⚡ Quick Actions</h2>
                    <div className="quick-actions">
                        <Link to="/products/add">
                            <button className="action-btn">+ Add Product</button>
                        </Link>
                        <Link to="/users/add">
                            <button className="action-btn">+ Add User</button>
                        </Link>
                        <Link to="/orders/add">
                            <button className="action-btn">+ Create Order</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
