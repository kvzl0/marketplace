import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'marketplace'
})

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.json('hello, this is backend')
})

// ==================== SHOES ROUTES (Original - Keep for now) ====================

app.get('/shoes', (req,res)=>{
    const q = 'SELECT * FROM shoes'  
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/shoes", (req,res)=>{
    const q="INSERT INTO shoes (`prod_name`, `prod_description`, `image`, `price`) VALUES(?, ?, ?, ?)";
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price
    ];
    db.query(q, values, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Successfully executed")
    })
}) 

app.put("/shoes/:id", (req,res)=>{
    const shoeId = req.params.id;
    const q="UPDATE shoes SET `prod_name`=?, `prod_description`=?, `image`=?, `price`=? WHERE id = ?";
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price
    ];
    
    db.query(q, [...values, shoeId], (err,data)=>{
        if(err) {
            console.log("Update error:", err);
            return res.json(err);
        }
        return res.json("Item has been successfully updated")
    })
});

app.delete("/shoes/:id", (req,res)=>{
    const shoeId = req.params.id;
    const q="DELETE FROM shoes WHERE id = ?";
    
    db.query(q, shoeId, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Successfully deleted")
    })
});

// ==================== PRODUCTS ROUTES ====================

app.get('/products', (req,res)=>{
    const q = 'SELECT * FROM products'  
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/products/:id', (req,res)=>{
    const productId = req.params.id;
    const q = 'SELECT * FROM products WHERE id = ?'
    db.query(q, productId, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data[0])
    })
})

app.post("/products", (req,res)=>{
    const q="INSERT INTO products (`prod_name`, `prod_description`, `image`, `price`, `quantity`, `category`) VALUES(?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price,
        req.body.quantity || 0,
        req.body.category || 'Uncategorized'
    ];
    db.query(q, values, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Product successfully created")
    })
}) 

app.put("/products/:id", (req,res)=>{
    const productId = req.params.id;
    const q="UPDATE products SET `prod_name`=?, `prod_description`=?, `image`=?, `price`=?, `quantity`=?, `category`=? WHERE id = ?";
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price,
        req.body.quantity,
        req.body.category
    ];
    
    db.query(q, [...values, productId], (err,data)=>{
        if(err) {
            console.log("Update error:", err);
            return res.json(err);
        }
        return res.json("Product has been successfully updated")
    })
});

app.delete("/products/:id", (req,res)=>{
    const productId = req.params.id;
    const q="DELETE FROM products WHERE id = ?";
    
    db.query(q, productId, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Product successfully deleted")
    })
});

// ==================== USERS ROUTES ====================

app.get('/users', (req,res)=>{
    const q = 'SELECT id, name, email, address, phone_number, role, created_at FROM users'  
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/users/:id', (req,res)=>{
    const userId = req.params.id;
    const q = 'SELECT id, name, email, address, phone_number, role, created_at FROM users WHERE id = ?'
    db.query(q, userId, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data[0])
    })
})

app.post("/users", (req,res)=>{
    const q="INSERT INTO users (`name`, `email`, `password`, `address`, `phone_number`, `role`) VALUES(?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password, // TODO: Hash this password later with bcrypt
        req.body.address,
        req.body.phone_number,
        req.body.role || 'customer'
    ];
    db.query(q, values, (err,data)=>{
        if(err) return res.json(err)
        return res.json("User successfully created")
    })
}) 

app.put("/users/:id", (req,res)=>{
    const userId = req.params.id;
    const q="UPDATE users SET `name`=?, `email`=?, `address`=?, `phone_number`=?, `role`=? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.phone_number,
        req.body.role
    ];
    
    db.query(q, [...values, userId], (err,data)=>{
        if(err) {
            console.log("Update error:", err);
            return res.json(err);
        }
        return res.json("User has been successfully updated")
    })
});

app.delete("/users/:id", (req,res)=>{
    const userId = req.params.id;
    const q="DELETE FROM users WHERE id = ?";
    
    db.query(q, userId, (err,data)=>{
        if(err) return res.json(err)
        return res.json("User successfully deleted")
    })
});

// ==================== ORDERS ROUTES ====================

app.get('/orders', (req,res)=>{
    const q = `SELECT orders.*, users.name as user_name, users.email as user_email 
               FROM orders 
               JOIN users ON orders.user_id = users.id 
               ORDER BY orders.order_date DESC`
    db.query(q, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/orders/:id', (req,res)=>{
    const orderId = req.params.id;
    const q = `SELECT orders.*, users.name as user_name, users.email as user_email 
               FROM orders 
               JOIN users ON orders.user_id = users.id 
               WHERE orders.id = ?`
    
    db.query(q, orderId, (err,orderData)=>{
        if(err) return res.json(err)
        
        // Get order items for this order
        const itemsQuery = `SELECT order_items.*, products.prod_name, products.image 
                           FROM order_items 
                           JOIN products ON order_items.product_id = products.id 
                           WHERE order_items.order_id = ?`
        
        db.query(itemsQuery, orderId, (err,itemsData)=>{
            if(err) return res.json(err)
            return res.json({
                ...orderData[0],
                items: itemsData
            })
        })
    })
})

app.get('/orders/user/:userId', (req,res)=>{
    const userId = req.params.userId;
    const q = `SELECT orders.* FROM orders WHERE orders.user_id = ? ORDER BY orders.order_date DESC`
    
    db.query(q, userId, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/orders", (req,res)=>{
    const orderQuery = "INSERT INTO orders (`user_id`, `total_amount`, `shipping_address`, `status`) VALUES(?, ?, ?, ?)";
    const orderValues = [
        req.body.user_id,
        req.body.total_amount,
        req.body.shipping_address,
        req.body.status || 'pending'
    ];
    
    db.query(orderQuery, orderValues, (err,orderResult)=>{
        if(err) return res.json(err)
        
        const orderId = orderResult.insertId;
        
        // Insert order items if they exist
        if(req.body.items && req.body.items.length > 0){
            const itemsQuery = "INSERT INTO order_items (`order_id`, `product_id`, `quantity`, `price`) VALUES ?";
            const itemsValues = req.body.items.map(item => [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]);
            
            db.query(itemsQuery, [itemsValues], (err,itemsResult)=>{
                if(err) return res.json(err)
                return res.json("Order successfully created")
            })
        } else {
            return res.json("Order successfully created")
        }
    })
}) 

app.put("/orders/:id", (req,res)=>{
    const orderId = req.params.id;
    const q="UPDATE orders SET `status`=?, `shipping_address`=? WHERE id = ?";
    const values = [
        req.body.status,
        req.body.shipping_address
    ];
    
    db.query(q, [...values, orderId], (err,data)=>{
        if(err) {
            console.log("Update error:", err);
            return res.json(err);
        }
        return res.json("Order has been successfully updated")
    })
});

app.delete("/orders/:id", (req,res)=>{
    const orderId = req.params.id;
    const q="DELETE FROM orders WHERE id = ?";
    
    db.query(q, orderId, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Order successfully deleted")
    })
});

// ==================== START SERVER ====================

app.listen(8800, ()=>{
    console.log('Connected to backend')
})