// ===== Navbar.jsx =====
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/">
                        {/* Try to load logo, fallback to text if it fails */}
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
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;