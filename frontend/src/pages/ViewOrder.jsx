import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const ViewOrder =() => {
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];

    useEffect(()=>{
        const fetchOrder = async ()=>{
            try{
                const res = await axios.get(`http://localhost:8800/orders/${orderId}`)
                setOrder(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchOrder()
    },[orderId])

    if(!order) return <div>Loading...</div>

    return(
        <div className="form"> 
            <h1>Order Details - Order #{order.id}</h1>
            
            <div>
                <h2>Customer Information</h2>
                <p><strong>Name:</strong> {order.user_name}</p>
                <p><strong>Email:</strong> {order.user_email}</p>
                <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            </div>

            <div>
                <h2>Order Information</h2>
                <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> ${order.total_amount}</p>
            </div>

            <div>
                <h2>Order Items</h2>
                {order.items && order.items.length > 0 ? (
                    <table style={{width: '100%', borderCollapse: 'collapse'}}>
                        <thead>
                            <tr style={{borderBottom: '2px solid #333'}}>
                                <th style={{padding: '10px', textAlign: 'left'}}>Product</th>
                                <th style={{padding: '10px', textAlign: 'center'}}>Quantity</th>
                                <th style={{padding: '10px', textAlign: 'right'}}>Price</th>
                                <th style={{padding: '10px', textAlign: 'right'}}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index)=>(
                                <tr key={index} style={{borderBottom: '1px solid #ddd'}}>
                                    <td style={{padding: '10px'}}>
                                        {item.image && <img src={item.image} alt={item.prod_name} style={{width: '50px', marginRight: '10px'}}/>}
                                        {item.prod_name}
                                    </td>
                                    <td style={{padding: '10px', textAlign: 'center'}}>{item.quantity}</td>
                                    <td style={{padding: '10px', textAlign: 'right'}}>${item.price}</td>
                                    <td style={{padding: '10px', textAlign: 'right'}}>${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items in this order</p>
                )}
            </div>

            <button>
                <Link to="/orders">Back to Orders</Link>
            </button>
        </div>
    )
} 

export default ViewOrder;