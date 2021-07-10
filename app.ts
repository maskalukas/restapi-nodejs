export {};
const express = require("express");
const app = express();
const port = 3000;

const products = require("./routes/products");

app.listen(port,() => {
    console.log("Started...");
});

// routes - products
app.use('/products', products);