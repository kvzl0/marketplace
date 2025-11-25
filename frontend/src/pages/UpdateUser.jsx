import axios from "axios";
import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateUser =() => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        address:"",
        phone_number:"",
        role:"customer"
    });
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.pathname.split("/")[3];

    const handChange = (e) =>{
        setUser((prev)=>({...prev, [e.target.name]: e.target.value}))
    };
    
    const handleClick = async e =>{
        e.preventDefault()
        console.log("Sending user data", user);
        try{
            const response = await axios.put(`http://localhost:8800/users/${userId}`, user)
            console.log("Response:", response.data);
            navigate("/users")
        }catch(err){
            console.log(err)
            console.log("Error response:", err.response)
        }
    }

    return(
        <div className="form"> 
            <h1>Update User</h1>
            <input type="text" placeholder="Name" onChange={handChange} name="name"/>
            <input type="email" placeholder="Email" onChange={handChange} name="email"/> 
            <input type="text" placeholder="Address" onChange={handChange} name="address"/>
            <input type="text" placeholder="Phone Number" onChange={handChange} name="phone_number"/>
            <select name="role" onChange={handChange} value={user.role}>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
            </select>
            
            <button onClick={handleClick}>Update</button>
        </div>
    )
} 

export default UpdateUser;