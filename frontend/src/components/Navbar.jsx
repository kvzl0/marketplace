// ===== Navbar.jsx =====
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
    const navigate = useNavigate();
    const location = useLocation(); // ← Added to detect current route

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("userRole");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    // Handle logo click: scroll to top if on homepage, else go home
    const handleLogoClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // Already on homepage → scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Navigate to homepage
            navigate('/');
        }
    };

    // Smooth scroll helper
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const currentScroll = window.pageYOffset;
            const elementTop = elementRect.top + currentScroll;
            const offsetPosition = elementTop - 0; // You've set offset to 0

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
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
                            <li><a href="#phone" onClick={(e) => scrollToSection(e, 'phone')}>Phone</a></li>
                            <li><a href="#audio" onClick={(e) => scrollToSection(e, 'audio')}>Audio</a></li>
                            <li><a href="#tablet" onClick={(e) => scrollToSection(e, 'tablet')}>Tablet</a></li>
                            <li><Link to="/dashboard">About</Link></li>
                            <li><Link to="/users">Community</Link></li>
                            <li><Link to="/orders">Support</Link></li>
                            {isLoggedIn ? (
                                <li>
                                    <Link to="#" onClick={handleLogout} className="logout-link">
                                        Logout
                                    </Link>
                                </li>
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