// ===== Register.jsx =====
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone_number: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Registering user:", formData);

        try {
            const response = await fetch("http://localhost:8800/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    role: "customer" // Set default role
                })
            });

            if (response.ok) {
                alert("Account created! Please log in.");
                navigate("/login");
            } else {
                alert("Registration failed. Email may already exist.");
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
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                    <input
                        type="text"
                        placeholder="Address (optional)"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number (optional)"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />

                    <button type="submit">Create Account</button>
                </form>

                {/* Already have an account? */}
                <div className="login-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;