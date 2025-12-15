import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'

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

app.post("/users", async (req, res) => {
    const { name, email, password, address, phone_number, role } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const q = "INSERT INTO users (`name`, `email`, `password`, `address`, `phone_number`, `role`) VALUES(?, ?, ?, ?, ?, ?)";
        const values = [
            name,
            email,
            hashedPassword, // hashed password
            address,
            phone_number,
            role || 'customer'
        ];
        db.query(q, values, (err, data) => {
            if (err) return res.json(err);
            return res.json("User successfully created");
        });
    } catch (err) {
        console.error("Hashing error:", err);
        return res.status(500).json({ error: "Failed to hash password" });
    }
});

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

app.get('/orders', (req, res) => {
    const userId = req.query.userId;

    let q;
    let params = [];

    if (userId) {
        // Customer: show only their orders
        q = `
            SELECT orders.*, users.name as user_name, users.email as user_email 
            FROM orders 
            JOIN users ON orders.user_id = users.id 
            WHERE orders.user_id = ?
            ORDER BY orders.order_date DESC
        `;
        params = [userId];
    } else {
        // Admin: show all orders
        q = `
            SELECT orders.*, users.name as user_name, users.email as user_email 
            FROM orders 
            JOIN users ON orders.user_id = users.id 
            ORDER BY orders.order_date DESC
        `;
    }

    db.query(q, params, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

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

app.post("/orders", (req, res) => {
    const { user_id, total_amount, shipping_address, status = "pending", items } = req.body;

    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Invalid order data" });
    }

    // Step 1: Validate stock for all items
    const productIds = items.map(item => item.product_id);
    const placeholders = productIds.map(() => '?').join(',');
    const stockCheckQ = `SELECT id, quantity FROM products WHERE id IN (${placeholders})`;

    db.query(stockCheckQ, productIds, (err, productStocks) => {
        if (err) {
            console.error("Stock check error:", err);
            return res.status(500).json({ error: "Failed to validate inventory" });
        }

        // Create a map of productId -> available stock
        const stockMap = {};
        productStocks.forEach(p => {
            stockMap[p.id] = p.quantity;
        });

        // Check if every item has enough stock
        const insufficientItems = items.filter(item => {
            const available = stockMap[item.product_id];
            return available === undefined || available < item.quantity;
        });

        if (insufficientItems.length > 0) {
            return res.status(400).json({
                error: "Insufficient stock for one or more items",
                details: insufficientItems.map(item => ({
                    productId: item.product_id,
                    requested: item.quantity,
                    available: stockMap[item.product_id] || 0
                }))
            });
        }

        // Step 2: Create the order
        const orderQuery = "INSERT INTO orders (`user_id`, `total_amount`, `shipping_address`, `status`) VALUES(?, ?, ?, ?)";
        const orderValues = [user_id, total_amount, shipping_address, status];

        db.query(orderQuery, orderValues, (err, orderResult) => {
            if (err) {
                console.error("Order creation error:", err);
                return res.status(500).json({ error: "Failed to create order" });
            }

            const orderId = orderResult.insertId;

            // Step 3: Insert order items
            const itemsQuery = "INSERT INTO order_items (`order_id`, `product_id`, `quantity`, `price`) VALUES ?";
            const itemsValues = items.map(item => [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]);

            db.query(itemsQuery, [itemsValues], (err) => {
                if (err) {
                    console.error("Order items insertion error:", err);
                    return res.status(500).json({ error: "Failed to save order items" });
                }

                // Step 4: Deduct stock from products
                const updateStockQueries = items.map(item => {
                    const updateQ = "UPDATE products SET quantity = quantity - ? WHERE id = ?";
                    return new Promise((resolve, reject) => {
                        db.query(updateQ, [item.quantity, item.product_id], (err) => {
                            if (err) {
                                console.error("Stock deduction error:", err);
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

                // Wait for all stock updates to complete
                Promise.all(updateStockQueries)
                    .then(() => {
                        return res.json({ 
                            message: "Order placed successfully", 
                            orderId 
                        });
                    })
                    .catch((err) => {
                        console.error("Stock deduction failed:", err);
                        // Note: In production, use DB transactions to rollback
                        return res.status(500).json({ 
                            error: "Order created but stock update failed. Please contact support." 
                        });
                    });
            });
        });
    });
});

app.put("/orders/:id", (req, res) => {
    const orderId = req.params.id;
    const q = "UPDATE orders SET `status`=? WHERE id = ?";
    const values = [
        req.body.status,
    ];
    
    db.query(q, [...values, orderId], (err, data) => {
        if(err) {
            console.log("Update error:", err);
            return res.status(500).json(err); // Also add proper status code
        }
        return res.json("Order has been successfully updated")
    });
});

app.delete("/orders/:id", (req,res)=>{
    const orderId = req.params.id;
    const q="DELETE FROM orders WHERE id = ?";
    
    db.query(q, orderId, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Order successfully deleted")
    })
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find user by email only
        const q = 'SELECT * FROM users WHERE email = ?';
        db.query(q, [email], async (err, data) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Server error" });
            }

            // Step 2: If no user, return error
            if (data.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // Step 3: Compare plain password with hashed password
            const user = data[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                // Success! (Don't send the password back)
                const { password: _, ...userWithoutPassword } = user;
                return res.json({ message: "Login successful", user: userWithoutPassword });
            } else {
                return res.status(401).json({ error: "Invalid email or password" });
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error during login" });
    }
});

// ==================== CART ROUTES ====================

// Get cart for logged-in user
app.get('/cart', (req, res) => {
    const userId = parseInt(req.query.userId);
    if (!userId) return res.status(400).json({ error: "User ID required" });

    const q = `
        SELECT 
            c.product_id,
            c.quantity AS cart_quantity,
            p.id,
            p.prod_name,
            p.prod_description,
            p.image,
            p.price,
            p.category
        FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    `;

    db.query(q, [userId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add or update cart item
app.post('/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const parsedUserId = parseInt(userId);
    const parsedProductId = parseInt(productId);
    const parsedQuantity = parseInt(quantity);
    if (!parsedUserId || !parsedProductId) {
        return res.status(400).json({ error: "Missing userId or productId" });
    }

    const updateQ = `
        UPDATE carts 
        SET quantity = ? 
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(updateQ, [parsedQuantity, parsedUserId, parsedProductId], (err, result) => {
        if (err) return res.json(err);

        if (result.affectedRows > 0) {
            return res.json("Cart item updated");
        } else {
            const insertQ = `
                INSERT INTO carts (user_id, product_id, quantity)
                VALUES (?, ?, ?)
            `;
            db.query(insertQ, [parsedUserId, parsedProductId, parsedQuantity], (err) => {
                if (err) return res.json(err);
                return res.json("Item added to cart");
            });
        }
    });
});

// Clear entire cart
app.delete('/cart/clear/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
        console.log("Invalid userId for clear:", req.params.userId);
        return res.status(400).json({ error: "Invalid userId" });
    }

    console.log("Clearing cart for user:", userId);

    const q = `
        DELETE FROM carts 
        WHERE user_id = ?
    `;

    db.query(q, [userId], (err, result) => {
        if (err) {
            console.log("Clear cart error:", err);
            return res.json(err);
        }
        console.log("Cart cleared, affected rows:", result.affectedRows);
        return res.json({
            message: "Cart cleared",
            affectedRows: result.affectedRows
        });
    });
});

// Remove single cart item
app.delete('/cart/:userId/:productId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);

    if (isNaN(userId) || isNaN(productId)) {
        console.log("Invalid IDs for remove:", req.params);
        return res.status(400).json({ error: "Invalid userId or productId" });
    }

    const q = `
        DELETE FROM carts 
        WHERE user_id = ? AND product_id = ?
    `;

    db.query(q, [userId, productId], (err) => {
        if (err) return res.json(err);
        return res.json("Item removed from cart");
    });
});


// ==================== START SERVER ====================

app.listen(8800, ()=>{
    console.log('Connected to backend')
})