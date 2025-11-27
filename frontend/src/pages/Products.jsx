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
        try {
            await axios.delete("http://localhost:8800/products/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Products</h1>
            
            <div className="shoes">
                {products.map((product) => (
                    <div className="shoe" key={product.id}>
                        <div className="shoe-image-container">
                            {product.image && <img src={product.image} alt={product.prod_name} />}
                        </div>
                        
                        <div className="shoe-info">
                            <h2>{product.prod_name}</h2>
                            <p>{product.prod_description}</p>
                            
                            <div className="shoe-price">₱{product.price}</div>
                            
                            <div className="shoe-meta">
                                <span>Stock: {product.quantity}</span>
                                <span>Category: {product.category}</span>
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

            <button>
                <Link to="/products/add">Add New Product</Link>
            </button>
        </div>
    );
};

export default Products;