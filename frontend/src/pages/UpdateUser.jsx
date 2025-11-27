import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        phone_number: "",
        role: "customer"
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.pathname.split("/")[3];

    // Fetch existing user data when component loads
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/users/${userId}`);
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    const handChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Sending user data", user);
        try {
            const response = await axios.put(`http://localhost:8800/users/${userId}`, user);
            console.log("Response:", response.data);
            navigate("/users");
        } catch (err) {
            console.log(err);
            console.log("Error response:", err.response);
        }
    };

    if (loading) return <div className="form"><h1>Loading...</h1></div>;

    return (
        <div className="form">
            <h1>Update User</h1>
            <input 
                type="text" 
                placeholder="Name" 
                onChange={handChange} 
                name="name" 
                value={user.name} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                onChange={handChange} 
                name="email" 
                value={user.email} 
            />
            <input 
                type="text" 
                placeholder="Address" 
                onChange={handChange} 
                name="address" 
                value={user.address} 
            />
            <input 
                type="text" 
                placeholder="Phone Number" 
                onChange={handChange} 
                name="phone_number" 
                value={user.phone_number} 
            />
            <select name="role" onChange={handChange} value={user.role}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
            </select>

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateUser;