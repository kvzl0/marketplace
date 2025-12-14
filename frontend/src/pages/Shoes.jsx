// ===== Shoes.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeroBanner from '../HeroBanner_HomePage.jpg';

const Shoes = () => {
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                const allProducts = res.data;

                const phone = allProducts.find(p => p.category === 'Phone');
                setFeaturedProduct(phone || allProducts[0] || {
                    prod_name: "PlusOne 15",
                    prod_description: "Snapdragon® 8 Elite Gen 5 | Silky-smooth 165Hz Display | 7300mAh Battery"
                });

                setProducts(allProducts);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load products:", err);
                setFeaturedProduct({
                    prod_name: "PlusOne 15",
                    prod_description: "Snapdragon® 8 Elite Gen 5 | Silky-smooth 165Hz Display | 7300mAh Battery"
                });
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // ✅ Enhanced auto-scroll: waits for content + uses requestAnimationFrame
    useEffect(() => {
        const scrollIfHash = () => {
            const hash = window.location.hash;
            if (!hash) return;

            const id = hash.substring(1);
            const maxAttempts = 20; // Try for ~2 seconds
            let attempts = 0;

            const tryScroll = () => {
                const element = document.getElementById(id);
                if (element) {
                    // Calculate position (account for hero margin)
                    const elementTop = element.offsetTop;
                    window.scrollTo({
                        top: elementTop,
                        behavior: 'smooth'
                    });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    requestAnimationFrame(tryScroll); // Try again next frame
                }
            };

            // Wait a tick, then start trying
            setTimeout(() => {
                tryScroll();
            }, 50);
        };

        // Initial scroll on load
        scrollIfHash();

        // Optional: re-scroll if hash changes (e.g., back button)
        window.addEventListener('hashchange', scrollIfHash);
        return () => window.removeEventListener('hashchange', scrollIfHash);
    }, []);

    const phoneProducts = products.filter(p => p.category === 'Phone');
    const audioProducts = products.filter(p => p.category === 'Audio');
    const tabletProducts = products.filter(p => p.category === 'Tablet');

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete("http://localhost:8800/products/" + id);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const renderProductList = (items) => (
        <div className="shoes">
            {items.map((product) => (
                <div className="shoe" key={product.id}>
                    <div className="shoe-image-container">
                        {product.image ? (
                            <img src={product.image} alt={product.prod_name} />
                        ) : (
                            <div className="shoe-no-image">No Image</div>
                        )}
                    </div>
                    <div className="shoe-info">
                        <h2>{product.prod_name}</h2>
                        <p>{product.prod_description}</p>
                        <div className="shoe-price">₱{parseFloat(product.price).toLocaleString()}</div>
                        <div className="shoe-actions">
                            <button className="update">
                                <Link to={`/products/update/${product.id}`}>Edit</Link>
                            </button>
                            <button className="delete" onClick={() => handleDelete(product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    if (loading) return null;

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-absolute">
                <section 
                    className="hero-full-bg"
                    style={{ backgroundImage: `url(${HeroBanner})` }}
                >
                    <div className="hero-full-overlay"></div>
                    <div className="hero-full-content">
                        <p className="hero-tagline">Power On. Limits Off.</p>
                        <h1 className="hero-full-title">{featuredProduct.prod_name}</h1>
                        <p className="hero-product-specs">
                            {featuredProduct.prod_description.split('|').slice(0, 3).join(' | ') || featuredProduct.prod_description}
                        </p>
                        <a href="#phone" className="hero-cta">
                            <button className="hero-learn-more">View Phones</button>
                        </a>
                    </div>
                </section>
            </div>

            {/* Phone Section */}
            {phoneProducts.length > 0 && (
                <section id="phone" className="products-section">
                    <div className="section-header">
                        <h2>Phones</h2>
                    </div>
                    {renderProductList(phoneProducts)}
                </section>
            )}

            {/* Audio Section */}
            {audioProducts.length > 0 && (
                <section id="audio" className="products-section">
                    <div className="section-header">
                        <h2>Audio</h2>
                    </div>
                    {renderProductList(audioProducts)}
                </section>
            )}

            {/* Tablet Section */}
            {tabletProducts.length > 0 && (
                <section id="tablet" className="products-section">
                    <div className="section-header">
                        <h2>Tablets</h2>
                    </div>
                    {renderProductList(tabletProducts)}
                </section>
            )}

            {/* Fallback */}
            {phoneProducts.length === 0 && audioProducts.length === 0 && tabletProducts.length === 0 && products.length > 0 && (
                <section className="products-section">
                    <div className="section-header">
                        <h2>Featured Items</h2>
                        <p>All products</p>
                    </div>
                    {renderProductList(products)}
                </section>
            )}
        </div>
    );
};

export default Shoes;