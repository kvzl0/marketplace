// ===== Register.jsx =====
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone_number: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateName = (name) => name.trim().split(/\s+/).length >= 2;
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSymbols = /[\W_]/.test(password);
        const lengthValid = password.length >= 8;
        const criteriaMet = [hasUpperCase, hasLowerCase, hasNumbers, hasSymbols].filter(Boolean).length;
        return lengthValid && criteriaMet >= 3;
    };
    const validateConfirmPassword = (pass, confirmPass) => pass === confirmPass;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prevErrors) => {
                const updated = { ...prevErrors };
                delete updated[name];
                return updated;
            });
        }

        if (name === "password") {
            if (value && !validatePassword(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "Password must be ≥8 chars and include 3 of: uppercase, lowercase, number, symbol"
                }));
            } else {
                setErrors((prevErrors) => {
                    const { password, ...rest } = prevErrors;
                    return rest;
                });
            }

            if (formData.confirmPassword && value !== formData.confirmPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: "Passwords do not match"
                }));
            } else if (formData.confirmPassword) {
                setErrors((prevErrors) => {
                    const { confirmPassword, ...rest } = prevErrors;
                    return rest;
                });
            }
        }

        if (name === "confirmPassword") {
            if (value && value !== formData.password) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: "Passwords do not match"
                }));
            } else {
                setErrors((prevErrors) => {
                    const { confirmPassword, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        // ✅ REMOVED setTouched line

        let error = "";
        if (name === "name" && value && !validateName(value)) {
            error = "Please enter your full name (first and last)";
        } else if (name === "email" && value && !validateEmail(value)) {
            error = "Please enter a valid email address";
        }

        if (error) {
            setErrors((prev) => ({ ...prev, [name]: error }));
        } else if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateName(formData.name)) newErrors.name = "Please enter your full name (first and last)";
        if (!validateEmail(formData.email)) newErrors.email = "Please enter a valid email address";
        if (!validatePassword(formData.password)) newErrors.password = "Password must be ≥8 chars and include 3 of: uppercase, lowercase, number, symbol";
        // ✅ FIXED: validateConfirmPassword (not validateConfirmZonePassword)
        if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, role: "customer" })
            });

            if (response.ok) {
                alert("Account created!");
                navigate("/login");
            } else {
                alert("Registration failed. Email may already exist.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src={require('../logo.png')} alt="PlusOne" />
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={errors.name ? "error" : ""}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className={errors.password ? "error" : ""}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "👁️" : "🔒"}
                        </span>
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}

                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className={errors.confirmPassword ? "error" : ""}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

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

                <div className="login-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
