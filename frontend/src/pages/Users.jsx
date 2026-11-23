import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/users/` + id);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    // ✅ Get user role from localStorage
    const userRole = localStorage.getItem("userRole");

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section hero-users">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">User Management</h1>
                    <p className="hero-subtitle">Manage customers and administrators</p>
                    
                    {/* ✅ Show "Add New User" button only if admin */}
                    {userRole === "admin" && (
                        <Link to="/users/add" className="hero-cta">
                            <button className="hero-button">Add New User</button>
                        </Link>
                    )}
                </div>
            </section>

            {/* Users Section */}
            <div className="products-section">
                <div className="section-header">
                    <h2>All Users</h2>
                    <p>{users.length} registered users</p>
                </div>

                <div className="shoes">
                    {users.map((user) => (
                        <div className="shoe" key={user.id}>
                            <div className="shoe-info">
                                <h2>{user.name}</h2>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone_number || 'N/A'}</p>
                                <p>Address: {user.address || 'N/A'}</p>
                                
                                <div className="shoe-meta">
                                    <span>Role: {user.role}</span>
                                </div>

                                <div className="shoe-actions">
                                    {/* ✅ Also hide Edit/Delete for non-admins (optional but recommended) */}
                                    {userRole === "admin" && (
                                        <>
                                            <button className="update">
                                                <Link to={`/users/update/${user.id}`}>Edit</Link>
                                            </button>
                                            <button className="delete" onClick={() => handleDelete(user.id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {users.length === 0 && (
                    <div className="empty-state">
                        <h3>No users yet</h3>
                        <p>Start by adding your first user</p>
                        {userRole === "admin" && (
                            <Link to="/users/add">
                                <button>Add User</button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
