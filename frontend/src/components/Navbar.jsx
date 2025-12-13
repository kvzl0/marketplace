// ===== Navbar.jsx =====
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = (e) => {
        e.preventDefault(); // Prevent default Link behavior
        // Clear auth data
        localStorage.removeItem("userRole");
        localStorage.removeItem("isLoggedIn");
        // Redirect to login
        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">
                        <img 
                            src={require('../logo.png')} 
                            alt="PlusOne" 
                            className="navbar-logo"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        <span className="navbar-brand-text" style={{display: 'none'}}>PLUSONE</span>
                    </Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/products">Phone</Link></li>
                    <li><Link to="/products">Audio</Link></li>
                    <li><Link to="/products">Tablet</Link></li>
                    <li><Link to="/dashboard">About</Link></li>
                    <li><Link to="/users">Community</Link></li>
                    <li><Link to="/orders">Support</Link></li>

                    {/* Dynamic Login/Logout */}
                    {isLoggedIn ? (
                        <li>
                            <Link to="#" onClick={handleLogout} className="logout-link">
                                Logout
                            </Link>
                        </li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;