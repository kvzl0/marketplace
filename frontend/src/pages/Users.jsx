import React, { useEffect } from "react";
import {useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users =() => {

    const [users, setUsers]=useState([])

    useEffect(()=>{
        const fetchAllUsers= async ()=>{
            try{
                const res= await axios.get("http://localhost:8800/users")
                setUsers(res.data)
            }catch(err){
                console.log(err) 
            }
        }
        fetchAllUsers()
    },[])

    const handleDelete= async (id)=>{
            try{
                await axios.delete("http://localhost:8800/users/" +id)
                window.location.reload()
            }catch(err){
                console.log(err) 
            }
        }

    return(
        <div> 
            <h1>Users Management</h1>
            <div className="shoes">
                {users.map((user)=>(
                    <div className="shoe" key={user.id}>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone_number}</p>
                        <p>Address: {user.address}</p>
                        <span>Role: {user.role}</span>
                        <button className='delete' onClick={()=>handleDelete(user.id)}>Delete</button>
                        <button className='update'><Link to={`/users/update/${user.id}`}>Update</Link></button>
                    </div>
                ))} 
            </div>

            <button>
                <Link to="/users/add">Add new User</Link>
            </button>
        </div>
    )
} 

export default Users;