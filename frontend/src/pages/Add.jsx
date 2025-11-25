import axios from "axios";
import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Add =() => {
    const [shoe, setShoe] = useState({
        prod_name:"",
        prod_description:"",
        image:"",
        price: null
    });
const navigate = useNavigate();


const handChange = (e) =>{
    setShoe((prev)=>({...prev, [e.target.name]: e.target.value}))
};
const handleClick = async e =>{
    e.preventDefault()
    console.log("Sending shoe data", shoe);
    try{
        const response = await axios.post("http://localhost:8800/shoes", shoe)
        console.log("Response:", response.data);
        navigate("/")
    }catch(err){
        console.log(err)
        console.log("Error response:", err.response)
    }
}


//console.log(shoe)
    return(
        <div className="form"> 
        <h1> Add New Item </h1>
        <input type="text" placeholder="Product Name" onChange={handChange} name="prod_name"/>
        <input type="text" placeholder="Product Descriontion" onChange={handChange} name="prod_description"/> 
        <input type="text" placeholder="Image" onChange={handChange} name="image"/>
        <input type="number" placeholder="Price" onChange={handChange} name="price"/>
        
        <button onClick={handleClick}> Add</button>

        </div>
    )
} 

export default Add;