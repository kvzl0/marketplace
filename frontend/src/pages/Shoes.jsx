// ===== Shoes.jsx =====
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeroBanner from '../HeroBanner_HomePage.jpg';

const Shoes = () => {
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        // Fetch all products to get the featured one (e.g., category = 'Gadget' or first item)
        const fetchFeaturedProduct = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                const products = res.data;
                // Prioritize a gadget (like phone), fallback to first product
                const gadget = products.find(p => p.category === 'Phone'); // or 'Tablet', 'Audio'
                //const gadget = products.find(p => p.category && p.category.toLowerCase().includes('gadget'));
                setFeaturedProduct(gadget || products[0]);
            } catch (err) {
                console.error("Failed to load featured product:", err);
                // Fallback in case API fails
                setFeaturedProduct({
                    prod_name: "PlusOne 15",
                    prod_description: "Snapdragon® 8 Elite Gen 5 | Silky-smooth 165Hz Display | 7300mAh Battery"
                });
            }
        };

        // Fetch legacy items for "Featured Items" section (from products table)
        const fetchLegacyItems = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setShoes(res.data);
            } catch (err) {
                console.log("Failed to load legacy items:", err);
            }
        };

        fetchFeaturedProduct();
        fetchLegacyItems();
    }, []);

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
                        <h1 className="hero-full-title">{featuredProduct ? featuredProduct.prod_name : "PlusOne 15"}</h1>
                        <p className="hero-product-specs">
                            {featuredProduct 
                                ? `${featuredProduct.prod_description.split('|')[0] || 'Snapdragon® 8 Elite Gen 5'} | ${featuredProduct.prod_description.split('|')[1] || 'Silky-smooth 165Hz Display'} | ${featuredProduct.prod_description.split('|')[2] || '7300mAh Battery'}`
                                : "Snapdragon® 8 Elite Gen 5 | Silky-smooth 165Hz Display | 7300mAh Battery"
                            }
                        </p>
                        <Link to="/products" className="hero-cta">
                            <button className="hero-learn-more">Learn more</button>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Legacy Items Section */}
            {shoes.length > 0 && (
                <div className="products-section">
                    <div className="section-header">
                        <h2>Featured Items</h2>
                        <p>Check out our legacy collection</p>
                    </div>

                    <div className="shoes">
                        {shoes.map((shoe) => (
                            <div className="shoe" key={shoe.id}>
                                <div className="shoe-image-container">
                                    {shoe.image ? (
                                        <img src={shoe.image} alt={shoe.prod_name} />
                                    ) : (
                                        <div className="shoe-no-image">No Image</div>
                                    )}
                                </div>

                                <div className="shoe-info">
                                    <h2>{shoe.prod_name}</h2>
                                    <p>{shoe.prod_description}</p>
                                    <div className="shoe-price">₱{parseFloat(shoe.price).toLocaleString()}</div>

                                    <div className="shoe-actions">
                                        <button className="update">
                                            <Link to={`/products/update/${shoe.id}`}>Edit</Link>
                                        </button>
                                        <button className="delete" onClick={() => handleDelete(shoe.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shoes;