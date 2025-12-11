// ===== Login.jsx =====
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", formData);

        try {
            const response = await fetch("http://localhost:8800/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Login successful!");
                navigate("/dashboard"); // Redirect to dashboard after login
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
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

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