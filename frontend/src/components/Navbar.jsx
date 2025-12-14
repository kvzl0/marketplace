// ===== Navbar.jsx =====
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    const navigate = useNavigate();
    const location = useLocation();

    const getCartItemCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("userRole");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    // ✅ New function: handle category click from any page
    const handleCategoryClick = (e, sectionId) => {
        e.preventDefault();
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                const elementTop = element.offsetTop;
                window.scrollTo({ top: elementTop, behavior: "smooth" });
            }
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <Link to="/" onClick={handleLogoClick}>
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
                    {isLoggedIn && userRole === "admin" ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/orders">Orders</Link></li>
                            <li>
                                <Link to="#" onClick={handleLogout} className="logout-link">
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><a href="/#phone" onClick={(e) => handleCategoryClick(e, 'phone')}>Phone</a></li>
                            <li><a href="/#audio" onClick={(e) => handleCategoryClick(e, 'audio')}>Audio</a></li>
                            <li><a href="/#tablet" onClick={(e) => handleCategoryClick(e, 'tablet')}>Tablet</a></li>
                            <li><Link to="/dashboard">About</Link></li>
                            <li><Link to="/users">Community</Link></li>
                            <li><Link to="/orders">Support</Link></li>
                            {isLoggedIn && userRole === "customer" ? (
                                <>
                                    <li>
                                        <Link to="/cart" className="cart-link">
                                            🛒 {getCartItemCount() > 0 && (
                                                <span className="cart-badge">{getCartItemCount()}</span>
                                            )}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" onClick={handleLogout} className="logout-link">
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li><Link to="/login">Login</Link></li>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;