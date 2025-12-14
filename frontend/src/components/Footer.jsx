// ===== Footer.jsx =====
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Reusable scroll handler (same logic as Navbar)
    const handleCategoryClick = (e, sectionId) => {
        e.preventDefault();
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
        <footer className="footer">
            <div className="footer-container">
                {/* Product Section */}
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li>
                            <a 
                                href="/#phone" 
                                onClick={(e) => handleCategoryClick(e, 'phone')}
                            >
                                Phones
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/#audio" 
                                onClick={(e) => handleCategoryClick(e, 'audio')}
                            >
                                IoT Products
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/#tablet" 
                                onClick={(e) => handleCategoryClick(e, 'tablet')}
                            >
                                Tablet
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><Link to="/support">User Manuals</Link></li>
                        <li><Link to="/support">Software Upgrade</Link></li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">About PlusOne</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/">OxygenOS</Link></li>
                        <li><Link to="/">Service Center</Link></li>
                        <li><Link to="/">Warranty Policy</Link></li>
                    </ul>
                </div>

                {/* Legal & Copyright */}
                <div className="footer-bottom">
                    <div className="footer-links">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <span className="separator">|</span>
                        <Link to="/user-agreement">User Agreement</Link>
                        <span className="separator">|</span>
                        <Link to="/security-feedback">Security Feedback</Link>
                        <span className="separator">|</span>
                        <Link to="/warranty-terms">Warranty Terms</Link>
                    </div>
                    <div className="footer-copyright">
                        © 2013 - 2025 PlusOne. All Rights Reserved.
                    </div>
                    <div className="footer-language">
                        <span>Philippines (English)</span>
                        <span className="language-dot">•</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;