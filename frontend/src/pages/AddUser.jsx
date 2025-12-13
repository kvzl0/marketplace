// ===== AddUser.jsx =====
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone_number: "",
        role: "customer"
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors((prevErrors) => {
                const updated = { ...prevErrors };
                delete updated[name];
                return updated;
            });
        }

        // Real-time password validation
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

            // Re-validate confirm password
            if (user.confirmPassword && value !== user.confirmPassword) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: "Passwords do not match"
                }));
            } else if (user.confirmPassword) {
                setErrors((prevErrors) => {
                    const { confirmPassword, ...rest } = prevErrors;
                    return rest;
                });
            }
        }

        if (name === "confirmPassword") {
            if (value && value !== user.password) {
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
        let error = "";
        if (name === "name" && value && !validateName(value)) {
            error = "Please enter full name (first and last)";
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

    const handleClick = async (e) => {
        e.preventDefault();

        // Final validation
        const newErrors = {};
        if (!validateName(user.name)) newErrors.name = "Please enter full name (first and last)";
        if (!validateEmail(user.email)) newErrors.email = "Please enter a valid email address";
        if (!validatePassword(user.password)) newErrors.password = "Password must be ≥8 chars and include 3 of: uppercase, lowercase, number, symbol";
        if (user.password !== user.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:8800/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert("User added successfully!");
                navigate("/users");
            } else {
                alert("Failed to add user. Email may already exist.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred.");
        }
    };

    return (
        <div className="form" style={{ marginTop: '70px', paddingTop: '20px' }}>
            <h1>Add New User</h1>
            <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={user.name}
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
                value={user.email}
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
                    value={user.password}
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
                    value={user.confirmPassword}
                    onChange={handleChange}
                    required
                    className={errors.confirmPassword ? "error" : ""}
                />
                <span
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? "👁️" : "🔒"}
                </span>
            </div>
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

            <input
                type="text"
                placeholder="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
            />

            <select
                name="role"
                value={user.role}
                onChange={handleChange}
            >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
            </select>

            <button onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddUser;