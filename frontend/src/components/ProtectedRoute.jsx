// frontend/src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = ["admin"] }) => {
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // If not logged in → redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If role not allowed → redirect to dashboard
    if (!allowedRoles.includes(userRole)) {
        alert("Access denied. Admins only.");
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
