import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const ViewOrder = () => {
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    // 👇 Get user role
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role;
    const userId = user?.id;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/orders/${orderId}`);
                setOrder(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (!order) return <div className="form" style={{ marginTop: '70px' }}>Loading...</div>;

    // ✅ Prevent customers from viewing other people's orders
    if (userRole !== "admin" && order.user_id !== userId) {
        return <div className="form" style={{ marginTop: '70px' }}>
            <h2>Access Denied</h2>
            <p>You can only view your own orders.</p>
            <Link to="/orders">
                <button>Go Back</button>
            </Link>
        </div>;
    }

    return (
        <div className="form" style={{ marginTop: '70px', paddingTop: '20px' }}> 
            <h1>Order Details - Order #{order.id}</h1>
            
            <div>
                <h2>Customer Information</h2>
                {userRole === "admin" ? (
                    <>
                        <p><strong>Name:</strong> {order.user_name}</p>
                        <p><strong>Email:</strong> {order.user_email}</p>
                    </>
                ) : (
                    <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
                )}
            </div>

            <div>
                <h2>Order Information</h2>
                <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> ₱{parseFloat(order.total_amount).toLocaleString()}</p>
            </div>

            <div>
                <h2>Order Items</h2>
                {order.items && order.items.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #333' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Product</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Quantity</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>Price</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px' }}>
                                        {item.image && <img src={item.image} alt={item.prod_name} style={{ width: '50px', marginRight: '10px' }} />}
                                        {item.prod_name}
                                    </td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>₱{parseFloat(item.price).toLocaleString()}</td>
                                    <td style={{ padding: '10px', textAlign: 'right' }}>₱{(item.quantity * item.price).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items in this order</p>
                )}
            </div>

            {/* ✅ Only admins see edit/delete */}
            {userRole === "admin" && (
                <div style={{ marginTop: '20px' }}>
                    <Link to={`/orders/update/${order.id}`}>
                        <button style={{ marginRight: '10px' }}>Edit Order</button>
                    </Link>
                    <button 
                        onClick={() => {
                            if (window.confirm("Delete this order?")) {
                                axios.delete(`http://localhost:8800/orders/${order.id}`)
                                    .then(() => window.location.href = "/orders");
                            }
                        }}
                        style={{ 
                            background: '#f44336', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 16px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete Order
                    </button>
                </div>
            )}

            <div style={{ marginTop: '20px' }}>
                <Link to="/orders">
                    <button>Back to Orders</button>
                </Link>
            </div>
        </div>
    );
};

export default ViewOrder;