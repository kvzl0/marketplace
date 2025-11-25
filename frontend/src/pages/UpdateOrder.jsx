import axios from "axios";
import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateOrder =() => {
    const [order, setOrder] = useState({
        status: "pending",
        shipping_address: ""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    const handChange = (e) =>{
        setOrder((prev)=>({...prev, [e.target.name]: e.target.value}))
    };
    
    const handleClick = async e =>{
        e.preventDefault()
        console.log("Sending order data", order);
        try{
            const response = await axios.put(`http://localhost:8800/orders/${orderId}`, order)
            console.log("Response:", response.data);
            navigate("/orders")
        }catch(err){
            console.log(err)
            console.log("Error response:", err.response)
        }
    }

    return(
        <div className="form"> 
            <h1>Update Order</h1>
            
            <select name="status" onChange={handChange} value={order.status}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <input 
                type="text" 
                placeholder="Shipping Address" 
                onChange={handChange} 
                name="shipping_address"
                value={order.shipping_address}
            />
            
            <button onClick={handleClick}>Update</button>
        </div>
    )
} 

export default UpdateOrder;