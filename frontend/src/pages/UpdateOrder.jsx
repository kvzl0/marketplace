import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateOrder = () => {
    const [order, setOrder] = useState({
        status: "pending",
        shipping_address: "",
        user_id: "",
        total_amount: "",
        created_at: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    // Fetch existing order data when component loads
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${orderId}`);
                setOrder({
                    status: res.data.status,
                    shipping_address: res.data.shipping_address,
                    user_id: res.data.user_id,
                    total_amount: res.data.total_amount,
                    created_at: res.data.created_at
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    const handChange = (e) => {
        setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Sending order data", order);
        try {
            // Only send the status in the update
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
                status: order.status
            });
            console.log("Response:", response.data);
            navigate("/orders");
        } catch (err) {
            console.log(err);
            console.log("Error response:", err.response);
        }
    };

    if (loading) return <div className="form"><h1>Loading...</h1></div>;

    return (
        <div className="form" style={{ marginTop: '105px' }}>
            <h1>Update Order</h1>

            <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Order ID:</strong> {orderId}
                </p>
                <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Customer:</strong> {order.user_id}
                </p>
                <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Date:</strong> {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}
                </p>
                <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Address:</strong> {order.shipping_address}
                </p>
                <p style={{ margin: '10px 0', fontSize: '16px', color: '#555' }}>
                    <strong style={{ color: '#333' }}>Total Amount:</strong> {order.total_amount ? `$${order.total_amount}` : ''}
                </p>
            </div>

            <label htmlFor="status" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Order Status
            </label>
            <select 
                id="status"
                name="status" 
                onChange={handChange} 
                value={order.status}
            >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateOrder;
