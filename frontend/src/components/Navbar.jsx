// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from '../CartContext';
import "./Navbar.css";

const Navbar = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));
    const userRole = user?.role;
    const navigate = useNavigate();
    const location = useLocation();

    const { cartItems } = useCart();

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
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
            <div className="navbar-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <div className="navbar-brand" style={{ flexShrink: 0 }}>
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
                        <span className="navbar-brand-text" style={{ display: 'none' }}>PLUSONE</span>
                    </Link>
                </div>

                <ul className="navbar-links" style={{
                    display: 'flex',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    flex: 1,
                    justifyContent: 'center',
                    gap: '24px'
                }}>
                    {isLoggedIn && userRole === "admin" ? (
                        <>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/orders">Orders</Link></li>
                        </>
                    ) : (
                        <>
                            <li><a href="/#phone" onClick={(e) => handleCategoryClick(e, 'phone')}>Phone</a></li>
                            <li><a href="/#audio" onClick={(e) => handleCategoryClick(e, 'audio')}>Audio</a></li>
                            <li><a href="/#tablet" onClick={(e) => handleCategoryClick(e, 'tablet')}>Tablet</a></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/community">Community</Link></li>
                            <li><Link to="/support">Support</Link></li>
                        </>
                    )}
                </ul>

                <div className="navbar-actions" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexShrink: 0
                }}>
                    {isLoggedIn ? (
                        <>
                            {/* Show cart only for customers */}
                            {userRole === "customer" && (
                                <Link 
                                    to="/cart" 
                                    className="cart-link"
                                    style={{
                                        position: 'relative',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        color: '#666666',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.8px'
                                    }}
                                >
                                    <img 
                                        src={require('../cart-icon.png')} 
                                        alt="Shopping Cart"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            marginRight: '5px',
                                            verticalAlign: 'middle'
                                        }}
                                    />
                                    {getCartItemCount() > 0 && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                top: '-4px',
                                                right: '-4px',
                                                background: '#eb0028',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: '18px',
                                                height: '18px',
                                                fontSize: '0.75rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {getCartItemCount()}
                                        </span>
                                    )}
                                </Link>
                            )}
                            
                            {/* Logout button for ALL logged-in users (admin and customer) */}
                            <Link 
                                to="#" 
                                onClick={handleLogout}
                                style={{
                                    textDecoration: 'none',
                                    color: '#666666',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.8px'
                                }}
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link 
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: '#666666',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.8px'
                            }}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;