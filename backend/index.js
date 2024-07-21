const express = require('express');
const cors = require('cors'); //to allow cross-origin requests

const app = express();
app.use(express.json()); // allows us to parse incoming requests with JSON payloads
app.use(cors());

const db = require('mysql').createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "test"
})

app.get("/", (req, res) => {
    res.json("Hello World!");
});

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books";
    db.query(query, (err, result) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json(result);
        }
    });
});

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?, ?, ?)";
    const values = [req.body.title, req.body.desc, req.body.cover];

    db.query(query, values, (err, result) => {
        if(err) {
            res.json({error: err});
        } else {
            res.json(result);
        }
    });
});

app.listen(8000);