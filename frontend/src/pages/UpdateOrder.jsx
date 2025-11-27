import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateOrder = () => {
    const [order, setOrder] = useState({
        status: "pending",
        shipping_address: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    // Fetch existing order data when component loads
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/orders/${orderId}`);
                setOrder({
                    status: res.data.status,
                    shipping_address: res.data.shipping_address
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
            const response = await axios.put(`http://localhost:8800/orders/${orderId}`, order);
            console.log("Response:", response.data);
            navigate("/orders");
        } catch (err) {
            console.log(err);
            console.log("Error response:", err.response);
        }
    };

    if (loading) return <div className="form"><h1>Loading...</h1></div>;

    return (
        <div className="form">
            <h1>Update Order</h1>

            <select name="status" onChange={handChange} value={order.status}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <input
                type="text"
                placeholder="Shipping Address"
                onChange={handChange}
                name="shipping_address"
                value={order.shipping_address}
            />

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateOrder;