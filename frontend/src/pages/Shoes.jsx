import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Shoes = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchAllShoes = async () => {
            try {
                const res = await axios.get("http://localhost:8800/shoes");
                setShoes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete("http://localhost:8800/shoes/" + id);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div>
            {/* Main Hero Section */}
            <section className="hero-section hero-home">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Marketplace</h1>
                    <p className="hero-subtitle">Your premier destination for quality products</p>
                    <div className="hero-buttons">
                        <Link to="/products" className="hero-cta">
                            <button className="hero-button hero-button-primary">Browse Products</button>
                        </Link>
                        <Link to="/add" className="hero-cta">
                            <button className="hero-button hero-button-secondary">Add Item</button>
                        </Link>
                    </div>
                </div>
            </section>

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
                                            <Link to={`/update/${shoe.id}`}>Edit</Link>
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