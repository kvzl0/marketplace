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
                justifyContent: 'space-between', // ← This pushes logo left, nav center, actions right
                width: '100%'
            }}>
                {/* Left: Logo */}
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

                {/* Center: Main Navigation Links */}
                <ul className="navbar-links" style={{
                    display: 'flex',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
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
                            <li><Link to="/dashboard">About</Link></li>
                            <li><Link to="/users">Community</Link></li>
                            <li><Link to="/orders">Support</Link></li>
                        </>
                    )}
                </ul>

                {/* Right: Cart + Auth */}
                <div className="navbar-actions" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    {isLoggedIn && userRole === "customer" ? (
                        <>
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
                    ) : !isLoggedIn ? (
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
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;