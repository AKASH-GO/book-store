import express from "express";
import mysql from "mysql"; 

const app = express(); 
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "akashraja123",
    database: "test"
})

//express server middleware
app.use(express.json())

app.get("/", (req,res) => {
    res.json("hi this's backend");
})
app.get("/books", (req,res) => {
    const q = "SELECT * FROM books"
     db.query(q,(err,data) => {
        if(err)
        {
            return res.json(err)
        }
        else
        {
            return res.json(data)
        }
     })
})
app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`,`des`,`cover`) VALUES (?)"
     const values = [
        req.body.title,
        req.body.des,
        req.body.cover, 
     ];

    // query for the values
    db.query(q,[values], (err,data) => {
        if(err)
        {
            return res.json(err)
        }
        else
        {
            return res.json("Book has been created successfully")
        }
    })
})
app.listen(8082, () => {
     console.log("Connected to backend");
})