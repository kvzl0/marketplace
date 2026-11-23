// src/pages/OrderConfirmation.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="form" style={{ marginTop: '105px', textAlign: 'center' }}>
            <h2>Order Confirmed!</h2>
            <p>Thank you for your purchase.</p>
            {orderId && <p>Your order # is: <strong>{orderId}</strong></p>}
            <div style={{ marginTop: '30px' }}>
                <Link to="/orders">
                    <button className="continue-shopping-btn">View Order</button>
                </Link>
                <Link to="/" style={{ marginLeft: '15px' }}>
                    <button className="continue-shopping-btn">Continue Shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
