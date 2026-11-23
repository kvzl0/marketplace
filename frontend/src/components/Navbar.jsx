// src/components/Navbar.jsx
import React, { useState } from "react";
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
    const [menuOpen, setMenuOpen] = useState(false);

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const closeMenu = () => setMenuOpen(false);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("isLoggedIn");
        closeMenu();
        navigate("/login");
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        closeMenu();
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const handleCategoryClick = (e, sectionId) => {
        e.preventDefault();
        closeMenu();
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
            }
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    return (
        <nav className="navbar">
            {/* Backdrop — closes menu on outside tap */}
            {menuOpen && (
                <div
                    className={`navbar-backdrop${menuOpen ? ' open' : ''}`}
                    onClick={closeMenu}
                />
            )}
            <div className="navbar-container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                {/* Logo */}
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

                {/* Nav links (desktop center / mobile dropdown) */}
                <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
                    {isLoggedIn && userRole === "admin" ? (
                        <>
                            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
                            <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
                            <li><Link to="/users" onClick={closeMenu}>Users</Link></li>
                            <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
                        </>
                    ) : (
                        <>
                            <li><a href="/#phone" onClick={(e) => handleCategoryClick(e, 'phone')}>Phone</a></li>
                            <li><a href="/#audio" onClick={(e) => handleCategoryClick(e, 'audio')}>Audio</a></li>
                            <li><a href="/#tablet" onClick={(e) => handleCategoryClick(e, 'tablet')}>Tablet</a></li>
                            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                            <li><Link to="/community" onClick={closeMenu}>Community</Link></li>
                            <li><Link to="/support" onClick={closeMenu}>Support</Link></li>
                        </>
                    )}
                </ul>

                {/* Right side: cart + auth + hamburger */}
                <div className="navbar-actions" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexShrink: 0
                }}>
                    {isLoggedIn ? (
                        <>
                            {userRole === "customer" && (
                                <Link 
                                    to="/cart" 
                                    className="cart-link"
                                    onClick={closeMenu}
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
                            onClick={closeMenu}
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

                    {/* Hamburger — visible on mobile only (controlled by mobile.css) */}
                    <button
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
