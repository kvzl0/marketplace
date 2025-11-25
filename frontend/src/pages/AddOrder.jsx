import axios from "axios";
import React, { useEffect } from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddOrder =() => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({
        user_id: "",
        shipping_address: "",
        status: "pending",
        items: []
    });
    const [selectedProduct, setSelectedProduct] = useState({
        product_id: "",
        quantity: 1,
        price: 0
    });

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const usersRes = await axios.get("http://localhost:8800/users");
                const productsRes = await axios.get("http://localhost:8800/products");
                setUsers(usersRes.data);
                setProducts(productsRes.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchData()
    },[])

    const handleOrderChange = (e) =>{
        setOrder((prev)=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleProductChange = (e) => {
        const {name, value} = e.target;
        if(name === "product_id"){
            const product = products.find(p => p.id === parseInt(value));
            setSelectedProduct({
                product_id: value,
                quantity: 1,
                price: product ? product.price : 0
            });
        } else {
            setSelectedProduct((prev)=>({...prev, [name]: value}))
        }
    };

    const addProductToOrder = () => {
        if(selectedProduct.product_id && selectedProduct.quantity > 0){
            setOrder((prev)=>({
                ...prev,
                items: [...prev.items, {...selectedProduct}]
            }));
            setSelectedProduct({product_id: "", quantity: 1, price: 0});
        }
    };

    const removeProduct = (index) => {
        setOrder((prev)=>({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    const calculateTotal = () => {
        return order.items.reduce((total, item) => 
            total + (parseFloat(item.price) * parseInt(item.quantity)), 0
        ).toFixed(2);
    };
    
    const handleClick = async e =>{
        e.preventDefault()
        
        if(!order.user_id || !order.shipping_address || order.items.length === 0){
            alert("Please fill all fields and add at least one product");
            return;
        }

        const orderData = {
            ...order,
            total_amount: calculateTotal()
        };

        console.log("Sending order data", orderData);
        try{
            const response = await axios.post("http://localhost:8800/orders", orderData)
            console.log("Response:", response.data);
            navigate("/orders")
        }catch(err){
            console.log(err)
            console.log("Error response:", err.response)
        }
    }

    return(
        <div className="form"> 
            <h1>Create New Order</h1>
            
            <select name="user_id" onChange={handleOrderChange} value={order.user_id}>
                <option value="">Select Customer</option>
                {users.map((user)=>(
                    <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                ))}
            </select>

            <input 
                type="text" 
                placeholder="Shipping Address" 
                onChange={handleOrderChange} 
                name="shipping_address"
                value={order.shipping_address}
            />

            <select name="status" onChange={handleOrderChange} value={order.status}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <hr/>
            <h3>Add Products to Order</h3>

            <select name="product_id" onChange={handleProductChange} value={selectedProduct.product_id}>
                <option value="">Select Product</option>
                {products.map((product)=>(
                    <option key={product.id} value={product.id}>
                        {product.prod_name} - ${product.price}
                    </option>
                ))}
            </select>

            <input 
                type="number" 
                placeholder="Quantity" 
                name="quantity"
                onChange={handleProductChange} 
                value={selectedProduct.quantity}
                min="1"
            />

            <button type="button" onClick={addProductToOrder}>Add Product to Order</button>

            <hr/>
            <h3>Order Items:</h3>
            {order.items.length === 0 ? (
                <p>No items added yet</p>
            ) : (
                <ul>
                    {order.items.map((item, index) => {
                        const product = products.find(p => p.id === parseInt(item.product_id));
                        return (
                            <li key={index}>
                                {product?.prod_name} - Qty: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                <button type="button" onClick={() => removeProduct(index)}>Remove</button>
                            </li>
                        );
                    })}
                </ul>
            )}

            <h3>Total: ${calculateTotal()}</h3>
            
            <button onClick={handleClick}>Create Order</button>
        </div>
    )
} 

export default AddOrder;