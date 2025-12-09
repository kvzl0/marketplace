// ===== Footer.jsx =====
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Product Section */}
                <div className="footer-column">
                    <h3>Product</h3>
                    <ul>
                        <li><Link to="/products?category=Phone">Phones</Link></li>
                        <li><Link to="/products?category=Audio">IoT Products</Link></li>
                        <li><Link to="/products?category=Tablet">Tablet</Link></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><Link to="/support/user-manuals">User Manuals</Link></li>
                        <li><Link to="/support/software-upgrade">Software Upgrade</Link></li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">About OnePlus</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/oxygenos">OxygenOS</Link></li>
                        <li><Link to="/service-center">Service Center</Link></li>
                        <li><Link to="/warranty-policy">Warranty Policy</Link></li>
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
                        {/*<span className="language-icon">🌐</span>*/}
                        <span className="language-dot">•</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;