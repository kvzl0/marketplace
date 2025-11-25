import axios from "axios";
import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddProduct =() => {
    const [product, setProduct] = useState({
        prod_name:"",
        prod_description:"",
        image:"",
        price: null,
        quantity: null,
        category: ""
    });
    const navigate = useNavigate();

    const handChange = (e) =>{
        setProduct((prev)=>({...prev, [e.target.name]: e.target.value}))
    };
    
    const handleClick = async e =>{
        e.preventDefault()
        console.log("Sending product data", product);
        try{
            const response = await axios.post("http://localhost:8800/products", product)
            console.log("Response:", response.data);
            navigate("/products")
        }catch(err){
            console.log(err)
            console.log("Error response:", err.response)
        }
    }

    return(
        <div className="form"> 
            <h1>Add New Product</h1>
            <input type="text" placeholder="Product Name" onChange={handChange} name="prod_name"/>
            <input type="text" placeholder="Product Description" onChange={handChange} name="prod_description"/> 
            <input type="text" placeholder="Image URL" onChange={handChange} name="image"/>
            <input type="number" placeholder="Price" onChange={handChange} name="price"/>
            <input type="number" placeholder="Quantity" onChange={handChange} name="quantity"/>
            <input type="text" placeholder="Category" onChange={handChange} name="category"/>
            
            <button onClick={handleClick}>Add</button>
        </div>
    )
} 

export default AddProduct;