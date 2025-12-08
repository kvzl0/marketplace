// ===== AddProduct.jsx =====
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [product, setProduct] = useState({
        prod_name: "",
        prod_description: "",
        image: "",
        price: "",
        quantity: "",
        category: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Validation
        if (!product.prod_name.trim()) {
            alert("Product name is required.");
            return;
        }
        if (!product.price || isNaN(product.price) || parseFloat(product.price) <= 0) {
            alert("Please enter a valid price (greater than 0).");
            return;
        }
        if (!product.category) {
            alert("Please select a category.");
            return;
        }

        const payload = {
            ...product,
            price: parseFloat(product.price),
            quantity: product.quantity ? parseInt(product.quantity, 10) : 0
        };

        try {
            await axios.post("http://localhost:8800/products", payload);
            alert("Product added successfully!");
            navigate("/products");
        } catch (err) {
            console.error(err);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="form">
            <h1>Add New Product</h1>

            <input
                type="text"
                placeholder="Product Name *"
                onChange={handleChange}
                name="prod_name"
                value={product.prod_name}
                required
            />
            
            {/* Replace with textarea for long descriptions */}
            <textarea
                placeholder="Product Description"
                onChange={handleChange}
                name="prod_description"
                value={product.prod_description}
                rows="6" /* Adjust as needed */
                style={{
                    width: '100%',
                    padding: '16px',
                    marginBottom: '20px',
                    border: 'none',
                    borderBottom: '2px solid var(--medium-gray)',
                    background: 'transparent',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    borderRadius: '0'
                }}
            />

            <input
                type="text"
                placeholder="Image URL (optional)"
                onChange={handleChange}
                name="image"
                value={product.image}
            />
            <input
                type="number"
                placeholder="Price *"
                onChange={handleChange}
                name="price"
                value={product.price}
                min="0.01"
                step="0.01"
                required
            />
            <input
                type="number"
                placeholder="Quantity (optional)"
                onChange={handleChange}
                name="quantity"
                value={product.quantity}
                min="0"
            />
            
            <select
                onChange={handleChange}
                name="category"
                value={product.category}
                required
                style={{ textAlign: 'left' }}
            >
                <option value="" disabled selected> -- Select Category * -- </option>
                <option value="Phone">Phone</option>
                <option value="Audio">Audio</option>
                <option value="Tablet">Tablet</option>
            </select>

            <button onClick={handleClick}>Add Product</button>
        </div>
    );
};

export default AddProduct;