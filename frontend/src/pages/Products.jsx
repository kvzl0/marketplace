import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products =() => {

    const [products, setProducts]=useState([])

    useEffect(()=>{
        const fetchAllProducts= async ()=>{
            try{
                const res= await axios.get("http://localhost:8800/products")
                setProducts(res.data)
            }catch(err){
                console.log(err) 
            }
        }
        fetchAllProducts()
    },[])

    const handleDelete= async (id)=>{
            try{
                await axios.delete("http://localhost:8800/products/" +id)
                window.location.reload()
            }catch(err){
                console.log(err) 
            }
        }

    return(
        <div> 
            <h1>Products Marketplace</h1>
            <div className="shoes">
                {products.map((product)=>(
                    <div className="shoe" key={product.id}>
                        {product.image && <img src={product.image} alt=""/>}
                        <h2>{product.prod_name}</h2>
                        <p>{product.prod_description}</p>
                        <span>Price: ${product.price}</span>
                        <p>Quantity: {product.quantity}</p>
                        <p>Category: {product.category}</p>
                        <button className='delete' onClick={()=>handleDelete(product.id)}>Delete</button>
                        <button className='update'><Link to={`/products/update/${product.id}`}>Update</Link></button>
                    </div>
                ))} 
            </div>

            <button>
                <Link to="/products/add">Add new Product</Link>
            </button>
        </div>
    )
} 

export default Products;