import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders =() => {

    const [orders, setOrders]=useState([])

    useEffect(()=>{
        const fetchAllOrders= async ()=>{
            try{
                const res= await axios.get("http://localhost:8800/orders")
                setOrders(res.data)
            }catch(err){
                console.log(err) 
            }
        }
        fetchAllOrders()
    },[])

    const handleDelete= async (id)=>{
            try{
                await axios.delete("http://localhost:8800/orders/" +id)
                window.location.reload()
            }catch(err){
                console.log(err) 
            }
        }

    return(
        <div> 
            <h1>Orders Management</h1>
            <div className="shoes">
                {orders.map((order)=>(
                    <div className="shoe" key={order.id}>
                        <h2>Order #{order.id}</h2>
                        <p>Customer: {order.user_name}</p>
                        <p>Email: {order.user_email}</p>
                        <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                        <p>Status: <strong>{order.status}</strong></p>
                        <p>Total Amount: ${order.total_amount}</p>
                        <p>Shipping Address: {order.shipping_address}</p>
                        <button className='delete' onClick={()=>handleDelete(order.id)}>Delete</button>
                        <button className='update'><Link to={`/orders/update/${order.id}`}>Update</Link></button>
                        <button><Link to={`/orders/view/${order.id}`}>View Details</Link></button>
                    </div>
                ))} 
            </div>

            <button>
                <Link to="/orders/add">Create new Order</Link>
            </button>
        </div>
    )
} 

export default Orders;