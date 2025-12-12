// ===== AddUser.jsx =====
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone_number: "",
        role: "customer"
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending user data", user);
        try {
            const response = await axios.post("http://localhost:8800/users", user);
            console.log("Response:", response.data);
            alert("User added successfully!");
            navigate("/users");
        } catch (err) {
            console.error(err);
            alert("Failed to add user. Please try again.");
        }
    };

    return (
        <div className="form">
            <h1>Add New User</h1>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
            />
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

            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};

export default AddUser;