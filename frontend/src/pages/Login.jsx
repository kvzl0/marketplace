// ===== Login.jsx =====
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", formData);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json(); 

            if (response.ok && data.user) {
                // Save FULL user object to localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("userRole", data.user.role); // Save role separately
                localStorage.setItem("isLoggedIn", "true");

                console.log("Saved user:", data.user); // Debug log
                console.log("Saved role:", data.user.role); // Debug log

                alert("Login successful!");

                // 🔁 Redirect based on user role
                if (data.user.role === "admin") {
                    navigate("/dashboard");
                } else {
                    // Customer (or any non-admin) goes to homepage (Shoes.jsx)
                    navigate("/");
                }
            } else {
                alert("Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <img src={require('../logo.png')} alt="PlusOne" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    
                    {/* Password with Toggle */}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span 
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    {/* Forgot Password & Sign In */}
                    <div className="login-links">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit">Sign in</button>
                </form>

                {/* Don't have an account? */}
                <div className="login-footer">
                    Don't have an account? <Link to="/register">Create</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
