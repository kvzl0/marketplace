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
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/products/${productId}`);
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${productId}`, product);
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
            
            <label htmlFor="prod_name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Product Name
            </label>
            <input 
                id="prod_name"
                type="text" 
                placeholder="Product Name" 
                onChange={handChange} 
                name="prod_name" 
                value={product.prod_name} 
            />
            
            <label htmlFor="prod_description" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Product Description
            </label>
            <input 
                id="prod_description"
                type="text" 
                placeholder="Product Description" 
                onChange={handChange} 
                name="prod_description" 
                value={product.prod_description} 
            />
            
            <label htmlFor="image" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Image URL
            </label>
            <input 
                id="image"
                type="text" 
                placeholder="Image URL" 
                onChange={handChange} 
                name="image" 
                value={product.image} 
            />
            
            <label htmlFor="price" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Price
            </label>
            <input 
                id="price"
                type="number" 
                placeholder="Price" 
                onChange={handChange} 
                name="price" 
                value={product.price} 
            />
            
            <label htmlFor="quantity" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Quantity
            </label>
            <input 
                id="quantity"
                type="number" 
                placeholder="Quantity" 
                onChange={handChange} 
                name="quantity" 
                value={product.quantity} 
            />
            
            <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Category
            </label>
            <select 
                id="category"
                name="category" 
                onChange={handChange} 
                value={product.category}
            >
                <option value="Phone">Phone</option>
                <option value="Audio">Audio</option>
                <option value="Tablet">Tablet</option>
            </select>

            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateProduct;
