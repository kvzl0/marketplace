import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        prod_name: "",
        prod_description: "",
        image: "",
        price: null,
        quantity: null,
        category: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const productId = location.pathname.split("/")[3];

    // Fetch existing product data when component loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/products/${productId}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handChange = (e) => {
        setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Sending product data", product);
        try {
            const response = await axios.put(`http://localhost:8800/products/${productId}`, product);
            console.log("Response:", response.data);
            navigate("/products");
        } catch (err) {
            console.log(err);
            console.log("Error response:", err.response);
        }
    };

    if (loading) return <div className="form"><h1>Loading...</h1></div>;

    return (
        <div className="form" style={{ marginTop: '70px', paddingTop: '20px' }}>
            <h1>Update Product</h1>
            <input 
                type="text" 
                placeholder="Product Name" 
                onChange={handChange} 
                name="prod_name" 
                value={product.prod_name} 
            />
            <input 
                type="text" 
                placeholder="Product Description" 
                onChange={handChange} 
                name="prod_description" 
                value={product.prod_description} 
            />
            <input 
                type="text" 
                placeholder="Image URL" 
                onChange={handChange} 
                name="image" 
                value={product.image} 
            />
            <input 
                type="number" 
                placeholder="Price" 
                onChange={handChange} 
                name="price" 
                value={product.price} 
            />
            <input 
                type="number" 
                placeholder="Quantity" 
                onChange={handChange} 
                name="quantity" 
                value={product.quantity} 
            />
            <input 
                type="text" 
                placeholder="Category" 
                onChange={handChange} 
                name="category" 
                value={product.category} 
            />

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateProduct;