import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products");
                setProducts(res.data);
                setFilteredProducts(res.data);
                
                // Extract unique categories
                const uniqueCategories = [...new Set(res.data.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProducts();
    }, []);

    // Filter products whenever search term or category changes
    useEffect(() => {
        let filtered = products;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.prod_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.prod_description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, products]);

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

                {/* Search and Filter Bar */}
                <div className="search-filter-bar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-box">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="results-count">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                </div>

                <div className="shoes">
                    {filteredProducts.map((product) => (
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

                {filteredProducts.length === 0 && (
                    <div className="empty-state">
                        <h3>No products found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                        {searchTerm || selectedCategory !== "all" ? (
                            <button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                                Clear Filters
                            </button>
                        ) : (
                            <Link to="/products/add">
                                <button>Add Product</button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;