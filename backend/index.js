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


app.listen(8800, ()=>{
    console.log('Connected to backend')
})