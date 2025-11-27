import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
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
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Discover Amazing Products</h1>
                    <p className="hero-subtitle">Premium quality, curated just for you</p>
                    <Link to="/products/add" className="hero-cta">
                        <button className="hero-button">Add New Product</button>
                    </Link>
                </div>
            </section>

            {/* Products Section */}
            <div className="products-section">
                <div className="section-header">
                    <h2>All Products</h2>
                    <p>Browse our complete collection</p>
                </div>

                <div className="shoes">
                    {products.map((product) => (
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

                                <div className="shoe-meta">
                                    <span>Stock: {product.quantity}</span>
                                    <span>•</span>
                                    <span>{product.category}</span>
                                </div>

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

                {products.length === 0 && (
                    <div className="empty-state">
                        <h3>No products yet</h3>
                        <p>Start by adding your first product</p>
                        <Link to="/products/add">
                            <button>Add Product</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;